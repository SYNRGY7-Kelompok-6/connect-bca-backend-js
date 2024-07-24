"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const { DEVELOPMENT_DATABASE_URL, STAGING_DATABASE_URL, } = process.env;
const knexConfig = {
    test: {
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
exports.default = knexConfig;
