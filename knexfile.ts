import type { Knex } from "knex";
import { DatabaseConfig } from "./src/types/Database";
import dotenv from 'dotenv';

dotenv.config();

const {
  DEVELOPMENT_DATABASE_URL,
  STAGING_DATABASE_URL,
} = process.env as Required<DatabaseConfig>;

const knexConfig: { [key: string]: Knex.Config } = {
  development: {
    client: 'postgresql',
    connection: DEVELOPMENT_DATABASE_URL,
    pool: {
      min: 2,
      max: 10
    },
  },
  staging: {
    client: 'postgresql',
    connection: STAGING_DATABASE_URL,
    pool: {
      min: 2,
      max: 10
    },
  }
};

export default knexConfig;