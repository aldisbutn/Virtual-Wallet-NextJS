'use client';

import { signIn, signOut } from 'next-auth/react';

const Home = () => {
  return (
    <>
      <h1>hello</h1>
      <button onClick={() => signIn()}>Sign in</button>
      <button onClick={() => signOut()}>Sign out</button>
    </>
  );
};

export default Home;
