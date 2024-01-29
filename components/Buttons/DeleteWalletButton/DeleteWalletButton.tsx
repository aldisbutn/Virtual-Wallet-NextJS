import React from 'react';
import Button from '../Button/Button';
import deleteWallet from '@/utils/deleteWallet';
import revalidateTagAction from '@/app/actions';

type DeleteWalletButtonProps = {
  walletID: number;
  userID: number;
};
const DeleteWalletButton = (props: DeleteWalletButtonProps) => {
  const { walletID, userID } = props;

  const handleWalletDelete = async (walletID: number) => {
    await deleteWallet(walletID);
    revalidateTagAction(`wallets-${userID}`);
  };
  return (
    <Button
      click={() => {
        handleWalletDelete(walletID);
      }}
      buttonText={'Delete'}
      variant={'primary'}
    />
  );
};

export default DeleteWalletButton;
