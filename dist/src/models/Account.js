"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const objection_1 = require("objection");
class Account extends objection_1.Model {
    static get tableName() {
        return 'accounts';
    }
}
exports.default = Account;
