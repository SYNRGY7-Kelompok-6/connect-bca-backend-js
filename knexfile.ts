import type { Knex } from "knex";
import { DatabaseConfig } from "./src/interfaces/Database";
import dotenv from 'dotenv';

dotenv.config();

const {
  DEVELOPMENT_DATABASE_URL,
  PRODUCTION_DATABASE_URL,
} = process.env as Required<DatabaseConfig>;

const config: { [key: string]: Knex.Config } = {
  development: {
    client: 'postgresql',
    connection: DEVELOPMENT_DATABASE_URL,
    pool: {
      min: 2,
      max: 10
    },
  },
  production: {
    client: 'postgresql',
    connection: PRODUCTION_DATABASE_URL,
    pool: {
      min: 2,
      max: 10
    },
  }
};

export default config;