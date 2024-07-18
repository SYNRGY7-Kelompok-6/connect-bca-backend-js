import { Model } from 'objection';
import User from './User';

class Account extends Model {
  id!: string;
  user_id!: string;
  account_number!: string;
  available_balance!: number;
  currency!: string;
  created_date!: Date;
  updated_date!: Date;
  deleted_date!: Date;

  static get tableName() {
    return 'accounts'
  }

  static get relationMappings() {
    return {
      users: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: 'accounts.user.id',
          to: 'users.id'
        }
      }
    }
  }
}

export default Account;