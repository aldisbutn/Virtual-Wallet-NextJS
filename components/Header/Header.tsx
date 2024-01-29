import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import Style from '@/components/Header/Header.module.css';
import { getServerSession } from 'next-auth/next';
import Link from 'next/link';
import SignOutButton from '../Buttons/SignOutButton/SignOutButton';
import Image from 'next/image';

const Header = async () => {
  const session = await getServerSession(authOptions);
  const userName = session?.user.name;

  if (session === null) {
    return <></>;
  }
  return (
    <header className={Style.navWrapper}>
      <div className={Style.navContentWrapper}>
        <div className='logoWrapper'>
          <Link href='/wallets'>
            <Image src={'svg/logo.svg'} alt='logo' height={50} width={169.2} />
          </Link>
        </div>
        <div className={Style.userMenuWrapper}>
          <h1 className={Style.username}>{userName}</h1>
          <SignOutButton />
        </div>
      </div>
    </header>
  );
};

export default Header;
