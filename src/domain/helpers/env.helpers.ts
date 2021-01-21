import dotenv from 'dotenv';
import { config } from 'dotenv-flow';
import dotenv_expand from 'dotenv-expand';

export function expandEnvVariables(): void {
  dotenv.config();
  const envConfig = config({ purge_dotenv: true });
  dotenv_expand(envConfig);
}
