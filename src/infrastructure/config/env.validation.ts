import { plainToClass } from 'class-transformer';
import { IsEnum, validateSync, IsNotEmpty } from 'class-validator';

enum Environment {
  Development = 'development',
  Production = 'production',
  Test = 'test',
  Provision = 'provision',
}

class EnvironmentVariables {
  @IsEnum(Environment)
  NODE_ENV: Environment;

  @IsNotEmpty()
  NODE_PORT: string;

  @IsNotEmpty()
  MONGO_HOST: string;

  @IsNotEmpty()
  MONGO_USER: string;

  @IsNotEmpty()
  MONGO_PASS: string;

  @IsNotEmpty()
  MONGO_PORT: string;

  @IsNotEmpty()
  MONGO_DB_NAME: string;

  @IsNotEmpty()
  MONGO_CLIENT_URL: string;

  @IsNotEmpty()
  MONGO_AUTH_DB: string;
}

export function validate(config: Record<string, unknown>) {
  const validatedConfig = plainToClass(EnvironmentVariables, config, { enableImplicitConversion: true });
  const errors = validateSync(validatedConfig, { skipMissingProperties: false });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }
  return validatedConfig;
}
