import Account from '../models/Account';

export const findPinByAccountNumber = async (accountNumber: string): Promise<Account | undefined> => {
  return await Account.query()
    .select('account_number')
    .findOne({ account_number: accountNumber })
    .withGraphFetched('users')
    .modifyGraph('users', (queryBuilder) => {
      queryBuilder.select('pin');
    });
}