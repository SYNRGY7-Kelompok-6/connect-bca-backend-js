import User from '../models/User';

export const findByUserId = async (userId: string): Promise<{ name: string; accounts: { account_number: string } } | undefined> => {
  return await User.query()
    .select('name')
    .findOne({ user_id: userId })
    .withGraphFetched('accounts')
    .modifyGraph('accounts', (queryBuilder) => {
      queryBuilder.select('account_number');
    });
}
