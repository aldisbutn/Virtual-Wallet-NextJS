'use client';

import { TransactionType } from '@/types/transactionType';
import Button from '../Button/Button';
import deleteTransaction from '@/utils/deleteTransaction';
import revalidateTagAction from '@/app/actions';
import editTransaction from '@/utils/editTransaction';

const TransactionInfo = ({ transaction }: { transaction: TransactionType }) => {
  const { transactionID, walletID, type, amount, date, fraud } = transaction;

  const handleTransactionDelete = async (transactionID: number) => {
    await deleteTransaction(transactionID);
    revalidateTagAction(`transactions-${transactionID}`);
  };

  const handleTransactionFraud = async (transactionID: number) => {
    await editTransaction({
      transactionID,
      fraud: !fraud,
    });
    revalidateTagAction(`transactions-${transactionID}`);
  };
  return (
    <>
      <div>
        <h2>{type}</h2>
        <p>{amount}</p>
        <p>{date}</p>
        <Button
          click={() => {
            handleTransactionDelete(transactionID);
          }}
          buttonText={'Delete'}
          variant={'primary'}
        />
        <label>
          Fraud
          <input
            checked={Boolean(fraud)}
            onChange={() => {
              handleTransactionFraud(transactionID);
            }}
            type='checkbox'
          />
        </label>
      </div>
    </>
  );
};

export default TransactionInfo;
