import User from '../models/User';

export const findByUserId = async (userId: string): Promise<User | undefined> => {
  return await User.query().findOne({ user_id: userId }).withGraphFetched('accounts');
}
