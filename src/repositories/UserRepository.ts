import User from '../models/User';

export const findByUsername = async (username: string): Promise<User | undefined> => {
  return await User.query().findOne({ username }).withGraphFetched('accounts');
}
