import { getUserWallets } from '@/utils/getUserWallets';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../api/auth/[...nextauth]/route';
import CreateWallet from '@/components/CreateWallet/CreateWallet';
import WalletInfo from '@/components/WalletInfo/WalletInfo';

const Wallets = async () => {
  const session = await getServerSession(authOptions);
  const userID = session?.user.id;
  const wallets = (await getUserWallets(userID)) as WalletType[];

  return (
    <div>
      <CreateWallet />
      {wallets.map((wallet) => (
        <WalletInfo key={wallet.walletID} wallet={wallet} />
      ))}
    </div>
  );
};

export default Wallets;
