'use client';

import revalidateTagAction from '@/app/actions';
import { createWallet } from '@/utils/createWallet';
import { getSession } from 'next-auth/react';
import { FormEvent, useEffect, useState } from 'react';

const CreateWallet = () => {
  const [userID, setUserID] = useState(0);
  const [showWalletForm, setShowWalletForm] = useState(false);
  const [walletName, setWalletName] = useState('');

  const getUserIDFromSession = async () => {
    const session = await getSession();
    const userID = session?.user.id as number;
    setUserID(userID);
  };

  useEffect(() => {
    getUserIDFromSession();
  }, []);

  const handleAddWallet = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setShowWalletForm(false);
    await createWallet({ userID, name: walletName });
    revalidateTagAction(`wallets-${userID}`);
  };
  return (
    <div>
      {showWalletForm ? (
        <form
          id='addWalletForm'
          onSubmit={(e) => {
            handleAddWallet(e);
          }}
        >
          <label>
            <h2>Enter name</h2>
            <input
              type='text'
              name='walletName'
              onChange={(e) => {
                setWalletName(e.target.value);
              }}
            />
          </label>
          <button>Add</button>
        </form>
      ) : (
        <button
          onClick={() => {
            setShowWalletForm(true);
          }}
        >
          Add new wallet
        </button>
      )}
    </div>
  );
};
export default CreateWallet;
