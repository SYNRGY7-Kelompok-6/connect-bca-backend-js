export interface Amount {
  value: number;
  currency: 'IDR';
}

export interface QrisTransferPayload {
  beneficiaryName: string;
  beneficiaryAccountNumber: string;
  amount: Amount;
  type: 'QR Transfer';
  expiresAt: number;
}

export interface QrisPayPayload {
  beneficiaryName: string;
  beneficiaryAccountNumber: string;
  type: 'QR Pay';
}