import { findByUsername } from "../repositories/userRepository";
import { UserAccount } from "../interfaces/User";

export const getUserAccount = async (username: string): Promise<UserAccount | null> => {
  const user = await findByUsername(username);

  if (!user) {
    return null;
  }

  const userAccount: UserAccount = {
    user: {
      name: user.name,
      username: user.username
    },
    account: {
      account_number: user.accounts.account_number
    }
  }

  return userAccount;
}