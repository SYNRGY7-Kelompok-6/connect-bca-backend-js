interface Beneficiary{
  name: string;
  username: string;
  accountNumber: string;
}

export interface QrisTransferPayload {
  beneficiary: Beneficiary;
  amount: string;
  type: string;
  expiresAt: number;
}

export interface QrisPayPayload {
  beneficiary: Beneficiary;
  type: string;
}