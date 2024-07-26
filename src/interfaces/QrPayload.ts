interface Recipient {
  name: string;
  accountNumber: string;
}

export interface Amount {
  value: number;
  currency: 'IDR';
}

export interface QrisTransferPayload {
  recipient: Recipient;
  amount: Amount;
  type: 'QR Transfer';
  expiresAt: number;
}

export interface QrisPayPayload {
  recipient: Recipient;
  type: 'QR Pay';
}