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
exports.findPinByAccountNumber = void 0;
const Account_1 = __importDefault(require("../models/Account"));
const findPinByAccountNumber = (accountNumber) => __awaiter(void 0, void 0, void 0, function* () {
    return yield Account_1.default.query()
        .select('account_number')
        .findOne({ account_number: accountNumber })
        .withGraphFetched('users')
        .modifyGraph('users', (queryBuilder) => {
        queryBuilder.select('pin');
    });
});
exports.findPinByAccountNumber = findPinByAccountNumber;
