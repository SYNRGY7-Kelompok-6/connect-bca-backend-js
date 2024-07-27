interface Beneficiary {
  name: string;
  accountNumber: string;
}

export interface Amount {
  value: number;
  currency: 'IDR';
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