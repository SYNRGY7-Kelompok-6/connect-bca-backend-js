"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const knex_1 = __importDefault(require("knex"));
const objection_1 = require("objection");
const knexfile_1 = __importDefault(require("../../knexfile"));
const environment = process.env.NODE_ENV || 'development';
const db = (0, knex_1.default)(knexfile_1.default[environment]);
objection_1.Model.knex(db);
const checkDatabaseConnection = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield db.raw('SELECT 1+1 AS result');
        console.log(`Database connection in environtment ${environment} has been established successfully`);
    }
    catch (error) {
        console.error('Unable to connect to database:', error);
    }
});
exports.default = checkDatabaseConnection();
