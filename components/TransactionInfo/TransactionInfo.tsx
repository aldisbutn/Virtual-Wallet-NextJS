'use client';

import { TransactionType } from '@/types/transactionType';
import Button from '../Buttons/Button/Button';
import deleteTransaction from '@/utils/deleteTransaction';
import revalidateTagAction from '@/app/actions';
import editTransaction from '@/utils/editTransaction';
import Style from '@/components/TransactionInfo/TransactionInfo.module.css';

const TransactionInfo = ({ transaction }: { transaction: TransactionType }) => {
  const { transactionID, walletID, type, amount, date, fraud } = transaction;

  const handleTransactionDelete = async (transactionID: number) => {
    await deleteTransaction(transactionID);
    revalidateTagAction(`walletTransactions-${walletID}`);
  };

  const handleTransactionFraud = async (transactionID: number) => {
    await editTransaction({
      transactionID,
      fraud: !fraud,
    });
    revalidateTagAction(`walletTransactions-${walletID}`);
  };

  return (
    <>
      <div className={`${Style.transactionWrapper} ${type === 'deposit' ? Style.transactionDeposit : Style.transactionWithdrawal}`}>
        <label className={Style.fraudCheckboxWrapper}>
          Fraud
          <input
            checked={Boolean(fraud)}
            onChange={() => {
              handleTransactionFraud(transactionID);
            }}
            type='checkbox'
          />
        </label>
        <h2>{type}</h2>
        <p>Amount: {amount}</p>
        <p>{date}</p>
        <Button
          click={() => {
            handleTransactionDelete(transactionID);
          }}
          buttonText={'Delete'}
          variant={'danger'}
        />
      </div>
    </>
  );
};

export default TransactionInfo;
