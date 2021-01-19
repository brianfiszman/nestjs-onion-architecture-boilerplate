FROM node:fermium-alpine AS environment

ARG NEXUS_TOKEN
ENV NPM_REGISTRY_TOKEN="${NEXUS_TOKEN}"

ARG NPM_REGISTRY_URL=https://nexus.tools.msazi.shopadvizor.net/repository/npm-saz
ENV NPM_REGISTRY_URL="${NPM_REGISTRY_URL}"

ARG MS_HOME=/app
ENV MS_HOME="${MS_HOME}"

ENV MS_SCRIPTS="${MS_HOME}/scripts"

ENV USER_NAME=products USER_UID=1000 GROUP_NAME=products GROUP_UID=1000

WORKDIR "${MS_HOME}"

# Build
FROM environment AS develop

COPY ["./package.json", "./yarn.lock", "${MS_HOME}/"]
COPY ["./scripts/config_registry.sh", "/tmp/config_registry"]

RUN \
  # Config NPM Registry
  chmod a+x "/tmp/config_registry" \
  && "/tmp/config_registry" \
  # Packages needed for compilation
  && apk --update add --no-cache --virtual .gyp python3 py3-pip make g++ \
  # Install dev dependencies
  && yarn install --frozen-lockfile --network-timeout 100000 \  
  # Clean up
  && apk del .gyp

FROM develop AS builder

COPY . "${MS_HOME}"

RUN PATH="$(yarn bin)":${PATH} \
  && yarn test:ci \
  && yarn build \
  # Clean up dependencies for production image
  && yarn install --frozen-lockfile --network-timeout 100000 --production

# Serve
FROM environment AS serve

COPY ["./scripts/docker-entrypoint.sh", "/usr/local/bin/entrypoint"]
COPY ["./scripts/bootstrap.sh", "/usr/local/bin/bootstrap"]
COPY --from=builder "${MS_HOME}/node_modules" "${MS_HOME}/node_modules"
COPY --from=builder "${MS_HOME}/dist" "${MS_HOME}/dist"
COPY --from=builder "${MS_HOME}/.env*" "${MS_HOME}/"

RUN  \
  # Packages needed during runtime
  apk --update add --no-cache tini bash \
  # Leftover from base image
  && deluser --remove-home node \
  # Assign new user
  && addgroup -g ${GROUP_UID} -S ${GROUP_NAME} \
  && adduser -D -S -s /sbin/nologin -u ${USER_UID} -G ${GROUP_NAME} "${USER_NAME}" \
  # Change ownership of app folder 
  && chown -R "${USER_NAME}:${GROUP_NAME}" "${MS_HOME}/" \
  && chmod a+x \
    "/usr/local/bin/entrypoint" \
    "/usr/local/bin/bootstrap" \
  && rm -rf \    
    "/usr/local/lib/node_modules" \
    "/usr/local/bin/npm" \
    "/usr/local/bin/npx" \
    "/usr/local/bin/yarn" \
    "/usr/local/bin/yarnpkg" \
    "/usr/local/bin/docker-entrypoint.sh"

USER "${USER_NAME}"

EXPOSE 3030

ENTRYPOINT [ "/sbin/tini", "--", "/usr/local/bin/entrypoint" ]