FROM node:fermium-alpine

WORKDIR /app

COPY ./package.json /app/package.json
RUN yarn

COPY . .

CMD ["yarn", "start:debug"]
