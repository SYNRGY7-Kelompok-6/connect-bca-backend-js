import { Model } from 'objection';
import User from './User';

class Account extends Model {
  id!: string;
  user_id!: string;
  account_number!: string;
  account_type_id!: string;
  account_card_exp!: Date;
  available_balance!: number;
  available_balance_currency!: string;
  hold_amount!: number;
  hold_amount_currency!: string;
  created_date!: Date;
  updated_date!: Date;
  deleted_date!: Date;
  users!: User;

  static get tableName() {
    return 'accounts'
  }

  static get relationMappings() {
    return {
      users: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: 'accounts.user_id',
          to: 'users.id'
        }
      }
    }
  }
}

export default Account;