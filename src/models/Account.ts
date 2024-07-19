import { Model } from 'objection';

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
}

export default Account;