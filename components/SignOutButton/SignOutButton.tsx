'use client'

import { signOut } from 'next-auth/react';
import Button from '../Button/Button';

const SignOutButton = () => {
  return <Button click={() => signOut()} buttonText={'Sign Out'} variant={'primary'} />;
};

export default SignOutButton;
