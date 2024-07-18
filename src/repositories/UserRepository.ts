import User from '../models/User';

class UserRepository {
  async findByUsername(username: string): Promise<User | undefined> {
    return await User.query().findOne({ username }).withGraphFetched('accounts');
  }
}

export default new UserRepository();