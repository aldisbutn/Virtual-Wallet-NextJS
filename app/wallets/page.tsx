import { getUserWallets } from '@/utils/getUserWallets';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../api/auth/[...nextauth]/route';
import CreateWallet from '@/components/CreateWallet/CreateWallet';
import WalletInfo from '@/components/WalletInfo/WalletInfo';
import { redirect } from 'next/navigation';
import { getWalletTransactions } from '@/utils/getWalletTransactions';

const Wallets = async () => {
  const session = await getServerSession(authOptions);
  const userID = session?.user.id;

  if (session === null) {
    return redirect('auth/login');
  }

  const wallets = (await getUserWallets(userID)) as WalletType[];
  return (
    <main className='mainPage'>
      <CreateWallet />
      <div className='walletsWrapper'>
        {wallets.map(async (wallet) => {
          const transactions = await getWalletTransactions(wallet.walletID);
          return <WalletInfo key={wallet.walletID} wallet={wallet} transactions={transactions} />;
        })}
      </div>
    </main>
  );
};

export default Wallets;
