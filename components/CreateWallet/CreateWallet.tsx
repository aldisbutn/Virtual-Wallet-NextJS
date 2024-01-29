'use client';

import revalidateTagAction from '@/app/actions';
import { createWallet } from '@/utils/createWallet';
import { getSession } from 'next-auth/react';
import { FormEvent, useEffect, useState } from 'react';
import Style from '@/components/CreateWallet/CreateWallet.module.css';
import Button from '@/components/Buttons/Button/Button';

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
    <div className={Style.createWalletWrapper}>
      {showWalletForm ? (
        <form
          className={Style.addWalletForm}
          id='addWalletForm'
          onSubmit={(e) => {
            handleAddWallet(e);
          }}
        >
          <input
            type='text'
            name='walletName'
            placeholder='Wallet name...'
            className={Style.walletNameInput}
            onChange={(e) => {
              setWalletName(e.target.value);
            }}
          />
          <Button buttonText='Add' variant='primary' />
          <Button buttonText='Cancel' variant='secondary' click={() => {setShowWalletForm(false)}} />
        </form>
      ) : (
        <Button
          buttonText='Add new wallet'
          variant='primary'
          click={() => {
            setShowWalletForm(true);
          }}
        />
      )}
    </div>
  );
};
export default CreateWallet;
