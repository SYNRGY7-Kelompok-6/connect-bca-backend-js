export interface Amount {
  value: number;
  currency: 'IDR';
}

export interface QrisTransferPayload {
  beneficiaryName: string;
  beneficiaryAccountNumber: string;
  remark: 'QR Transfer';
  expiresAt: number;
}

export interface QrisPayPayload {
  sourceName: string;
  sourceAccountNumber: string;
  beneficiaryName?: string;
  beneficiaryAccountNumber?: string;
  amount: Amount;
  remark: 'QR Pay';
  expiresAt: number;
}