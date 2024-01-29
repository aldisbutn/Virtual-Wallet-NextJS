'use client';

import { useMemo, useState } from 'react';
import { TransactionType } from '@/types/transactionType';
import Link from 'next/link';
import DeleteWalletButton from '../Buttons/DeleteWalletButton/DeleteWalletButton';
import ShowWalletFormButton from '../Buttons/ShowWalletFormButton/ShowWalletFormButton';
import RenameWalletForm from '../RenameWalletForm/RenameWalletForm';
import Style from '@/components/WalletInfo/WalletInfo.module.css';

const WalletInfo = ({ wallet, transactions }: { wallet: WalletType; transactions: TransactionType[] }) => {
  const { walletID, userID, name } = wallet;

  const [showWalletForm, setShowWalletForm] = useState(false);

  const totalSum = useMemo(() => {
    const incomingTransactions = transactions.filter((transaction) => transaction.type === 'deposit');
    const outgoingTransactions = transactions.filter((transaction) => transaction.type === 'withdrawal');
    const totalSum =
      incomingTransactions.reduce((acc, transaction) => acc + transaction.amount, 0) -
      outgoingTransactions.reduce((acc, transaction) => acc + transaction.amount, 0);
    return totalSum;
  }, [transactions]);

  const isSumPositive = () => {
    if (totalSum > 0) {
      return Style.walletPositive;
    } else if (totalSum < 0) {
      return Style.walletNegative;
    } else {
      return Style.walletZero;
    }
  };

  return (
    <div className={`${Style.walletWrapper} ${isSumPositive()}`}>
      {showWalletForm ? (
        <RenameWalletForm
          walletID={walletID}
          walletName={name}
          userID={userID}
          submit={() => setShowWalletForm(false)}
        />
      ) : (
        <>
          <Link href={`/wallets/${walletID}`} className={Style.walletName}>{name}</Link>
          <h2>Balance: {totalSum}€</h2>
          <div className={Style.buttonsWrapper}>
            <ShowWalletFormButton click={() => setShowWalletForm(true)} />
            <DeleteWalletButton walletID={walletID} userID={userID} />
          </div>
        </>
      )}
    </div>
  );
};

export default WalletInfo;
