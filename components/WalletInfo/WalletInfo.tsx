'use client';

import deleteWallet from '@/utils/deleteWallet';
import Button from '../Button/Button';
import revalidateTagAction from '@/app/actions';
import { FormEvent, useEffect, useState } from 'react';
import editWallet from '@/utils/editWallet';
import { getWalletTransactions } from '@/utils/getWalletTransactions';
import { TransactionType } from '@/types/transactionType';
import Link from 'next/link';

const WalletInfo = ({ wallet }: { wallet: WalletType }) => {
  const { walletID, userID, name } = wallet;
  const [showWalletForm, setShowWalletForm] = useState(false);
  const [walletName, setWalletName] = useState('');
  const [transactions, setTransactions] = useState<TransactionType[]>([]);
  const incomingTransactions = transactions.slice().filter((transaction) => transaction.type === 'deposit');
  const outgoingTransactions = transactions.slice().filter((transaction) => transaction.type === 'withdrawal');
  const totalSum =
    incomingTransactions.reduce((acc, transaction) => acc + transaction.amount, 0) -
    outgoingTransactions.reduce((acc, transaction) => acc + transaction.amount, 0);

  useEffect(() => {
    const fetchData = async () => {
      const transactions = await getWalletTransactions(walletID);
      setTransactions(transactions);
    };
    fetchData();
  }, []);

  const handleWalletRename = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setShowWalletForm(false);
    await editWallet({
      walletID,
      name: walletName,
    });
    revalidateTagAction(`wallets-${userID}`);
  };

  const handleWalletDelete = async (walletID: number) => {
    await deleteWallet(walletID);
    revalidateTagAction(`wallets-${userID}`);
  };
  return (
    <div>
      {showWalletForm ? (
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
              defaultValue={name}
              onChange={(e) => {
                setWalletName(e.target.value);
              }}
            />
          </label>
          <button>Add</button>
        </form>
      ) : (
        <>
          <Link href={`/wallets/${walletID}`}>{name}</Link>
          <h2>{totalSum}</h2>
          <Button
            click={() => {
              setShowWalletForm(true);
            }}
            buttonText={'Rename'}
            variant={'primary'}
          />
          <Button
            click={() => {
              handleWalletDelete(walletID);
            }}
            buttonText={'Delete'}
            variant={'primary'}
          />
        </>
      )}
    </div>
  );
};

export default WalletInfo;
