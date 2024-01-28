import CreateTransaction from '@/components/CreateTransaction/CreateTransaction';
import TransactionInfo from '@/components/TransactionInfo/TransactionInfo';
import { TransactionType } from '@/types/transactionType';
import { getWalletTransactions } from '@/utils/getWalletTransactions';

const Wallet = async ({ params }: { params: { id: number } }) => {
  const { id } = params;
  const transactions = (await getWalletTransactions(id)) as TransactionType[];
  return (
    <div>
      <CreateTransaction
        params={{
          walletID: id,
        }}
      />
      {transactions.map((transaction) => (
        <TransactionInfo key={transaction.transactionID} transaction={transaction} />
      ))}
    </div>
  );
};

export default Wallet;
