import { Model } from 'objection';
import Account from './Account';

class User extends Model {
  id!: string;
  username!: string;
  name!: string;
  password!: string;
  pin!: number;
  pin_expired_date!: Date;
  is_verified!: boolean;
  created_date!: Date;
  updated_date!: Date;
  deleted_date!: Date;
  accounts!: Account;

  static get tableName() {
    return 'users'
  }

  static get relationMappings() {
    return {
      accounts: {
        relation: Model.HasOneRelation,
        modelClass: Account,
        join: {
          from: 'users.id',
          to: 'accounts.user_id'
        }
      }
    }
  }
}

export default User;