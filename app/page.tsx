import { getServerSession } from 'next-auth/next';
import { redirect } from 'next/navigation';
import { authOptions } from './api/auth/[...nextauth]/route';

const Home = async () => {
  const session = await getServerSession(authOptions);
  if (session === null) {
    return redirect('auth/login');
  }
  return (
    <>
      <h1>hello</h1>
    </>
  );
};

export default Home;
