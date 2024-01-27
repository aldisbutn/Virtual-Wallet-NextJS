import { getUser } from '@/utils/getUser';
import { getUserWallets } from '@/utils/getUserWallets';
import { getWalletTransactions } from '@/utils/getWalletTransactions';
import { getServerSession } from 'next-auth/next';

const Wallets = async () => {
  // const session = await getServerSession();
  // console.log(session);
  const userID = 1
  const user = await getUser(userID);
  const wallets = await getUserWallets(userID);
  const transactions = await getWalletTransactions(userID);
  return (
    <div>
      <h1>Wallets</h1>
    </div>
  );
};

export default Wallets;
