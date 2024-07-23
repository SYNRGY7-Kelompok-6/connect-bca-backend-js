interface Beneficiary{
  name: string;
  username: string;
  accountNumber: string;
}

export interface QrisPayPayload {
  beneficiary: Beneficiary;
  amount: string;
  type: string;
  expiresAt: number;
}