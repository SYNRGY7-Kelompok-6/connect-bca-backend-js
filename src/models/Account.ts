import { Model } from 'objection';

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

  static get tableName() {
    return 'accounts'
  }
}

export default Account;