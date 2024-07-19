interface User{
  name: string;
  username: string;
}

interface Account{
  account_number: string;
}

export interface UserAccount {
  user: User;
  account: Account;
}