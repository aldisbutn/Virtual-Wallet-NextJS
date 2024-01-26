export type Transaction = {
  transactionID: number;
  walletID: number;
  type: string;
  amount: number;
  date: string;
  fraud: boolean;
}