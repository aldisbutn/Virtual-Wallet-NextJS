import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import Style from '@/components/Header/Header.module.css';
import { Sign } from 'crypto';
import { getServerSession } from 'next-auth/next';
import Link from 'next/link';
import SignOutButton from '../SignOutButton/SignOutButton';

const Header = async () => {
  const session = await getServerSession(authOptions);
  const userName = session?.user.name;
  return (
    <header className={Style.navWrapper}>
      <div className='logoWrapper'>
        <h1>LOGO</h1>
        <h1>LOCATION</h1>
      </div>
      <div>
        <Link href='/wallets'>Wallets</Link>
        <Link href='/wallets'>Create New Wallet</Link>
      </div>
      <div>
        <input type='text' placeholder='Quick search...' />
      </div>
      <div>
        <SignOutButton />
        <h1>{userName}</h1>
        <h4>{userName[0]}</h4>
      </div>
    </header>
  );
};

export default Header;
