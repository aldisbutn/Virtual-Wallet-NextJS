'use client';

import { FormEvent, useState } from 'react';
import Button from '../Buttons/Button/Button';
import editWallet from '@/utils/editWallet';
import revalidateTagAction from '@/app/actions';

type RenameWalletFormProps = {
  walletID: number;
  walletName: string,
  userID: number;
  submit: (show: boolean) => void;
};

const RenameWalletForm = (props: RenameWalletFormProps) => {
  const { walletID, walletName, userID, submit } = props;
  const [newWalletName, setNewWalletName] = useState('');

  const handleWalletRename = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    submit(false);
    await editWallet({
      walletID,
      name: walletName,
    });
    revalidateTagAction(`wallets-${userID}`);
  };

  return (
    <form
      id='addWalletForm'
      onSubmit={(e) => {
        handleWalletRename(e);
      }}
    >
      <label>
        <h2>Enter name</h2>
        <input
          type='text'
          name='walletName'
          defaultValue={walletName}
          onChange={(e) => {
            setNewWalletName(e.target.value);
          }}
        />
      </label>
      <Button buttonText='Save' variant='primary' />
    </form>
  );
};

export default RenameWalletForm;
