"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const objection_1 = require("objection");
const Account_1 = __importDefault(require("./Account"));
class User extends objection_1.Model {
    static get tableName() {
        return 'users';
    }
    static get relationMappings() {
        return {
            accounts: {
                relation: objection_1.Model.HasOneRelation,
                modelClass: Account_1.default,
                join: {
                    from: 'users.id',
                    to: 'accounts.user_id'
                }
            }
        };
    }
}
exports.default = User;
