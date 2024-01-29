import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import CreateTransaction from '@/components/CreateTransaction/CreateTransaction';
import TransactionInfo from '@/components/TransactionInfo/TransactionInfo';
import { TransactionType } from '@/types/transactionType';
import { getWalletTransactions } from '@/utils/getWalletTransactions';
import { getServerSession } from 'next-auth/next';
import { redirect } from 'next/navigation';

const Wallet = async ({ params }: { params: { id: number } }) => {
  const session = await getServerSession(authOptions);
  if (session === null) {
    return redirect('auth/login');
  }

  const { id } = params;
  const transactions = (await getWalletTransactions(id)) as TransactionType[];

  return (
    <main className='mainPage'>
      <CreateTransaction
        params={{
          walletID: id,
        }}
      />
      <div className='transactionsWrapper'>
        {transactions.map((transaction) => (
          <TransactionInfo key={transaction.transactionID} transaction={transaction} />
        ))}
      </div>
    </main>
  );
};

export default Wallet;
