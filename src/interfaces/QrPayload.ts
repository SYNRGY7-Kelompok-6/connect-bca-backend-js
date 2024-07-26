interface Beneficiary{
  userId: string;
  name: string;
  username: string;
  accountNumber: string;
}

export interface Amount {
  value: number;
  currency: string;
}

export interface QrisTransferPayload {
  beneficiary: Beneficiary;
  amount: Amount;
  type: 'QR Transfer';
  expiresAt: number;
}

export interface QrisPayPayload {
  beneficiary: Beneficiary;
  type: 'QR Pay';
}