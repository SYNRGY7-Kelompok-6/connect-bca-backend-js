"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const objection_1 = require("objection");
const User_1 = __importDefault(require("./User"));
class Account extends objection_1.Model {
    static get tableName() {
        return 'accounts';
    }
    static get relationMappings() {
        return {
            users: {
                relation: objection_1.Model.BelongsToOneRelation,
                modelClass: User_1.default,
                join: {
                    from: 'accounts.user_id',
                    to: 'users.id'
                }
            }
        };
    }
}
exports.default = Account;
