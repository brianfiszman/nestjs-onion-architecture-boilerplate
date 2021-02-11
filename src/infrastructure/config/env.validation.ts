import { plainToClass } from 'class-transformer';
import { validateSync, IsNotEmpty } from 'class-validator';

class EnvironmentVariables {
  @IsNotEmpty()
  PORT: string;

  @IsNotEmpty()
  MONGO_CLIENT_URL: string;
  @IsNotEmpty()
  MONGO_DB_NAME: string;
  @IsNotEmpty()
  MONGO_USER: string;
  @IsNotEmpty()
  MONGO_PASS: string;

  @IsNotEmpty()
  KAFKA_HOST: string;
  @IsNotEmpty()
  KAFKA_CLIENT: string;
  @IsNotEmpty()
  KAFKA_GROUP: string;

  @IsNotEmpty()
  SCHEMA_REGISTRY_CLIENT: string;
  @IsNotEmpty()
  ACTIONS_SCHEMA: string;
  @IsNotEmpty()
  PRODUCTS_SCHEMA: string;
  @IsNotEmpty()
  JOBDATA_SCHEMA: string;
  @IsNotEmpty()
  ERRORS_SCHEMA: string;
}

export function validate(config: Record<string, unknown>) {
  const validatedConfig = plainToClass(EnvironmentVariables, config, { enableImplicitConversion: true });
  const errors = validateSync(validatedConfig, { skipMissingProperties: false });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }
  return validatedConfig;
}
