'use client';

import revalidateTagAction from '@/app/actions';
import { createTransaction } from '@/utils/createTransaction';
import { FormEvent, useState } from 'react';
import Button from '@/components/Buttons/Button/Button';
import Style from '@/components/CreateTransaction/CreateTransaction.module.css';

const CreateTransaction = ({ params }: { params: { walletID: number } }) => {
  const { walletID } = params;
  const [showTransactionForm, setShowTransactionForm] = useState(false);
  const [transactionType, setTransactionType] = useState('');
  const [transactionAmount, setTransactionAmount] = useState(0);
  const fraud = false;

  const handleAddTransaction = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setShowTransactionForm(false);
    createTransaction({
      walletID,
      type: transactionType,
      amount: transactionAmount,
      date: new Date().toLocaleString(),
      fraud,
    });
    revalidateTagAction(`wallet-${walletID}`);
  };

  return (
    <div className={Style.createTransactionWrapper}>
      {showTransactionForm ? (
        <form
          className={Style.createTransactionForm}
          id='addTransactionForm'
          onSubmit={(e) => {
            handleAddTransaction(e);
          }}
        >
          <label className={Style.createTransactionLabel}>
            <h2>Transaction type</h2>
            <select
              className={Style.transactionInput}
              id='transactionType'
              onChange={(e) => {
                setTransactionType(e.target.value);
              }}
              required
            >
              <option disabled selected>
                Select transaction type
              </option>
              <option value='deposit'>Deposit</option>
              <option value='withdrawal'>Withdrawal</option>
            </select>
          </label>
          <label className={Style.createTransactionLabel}>
            <h2>Enter transaction amount</h2>
            <input
              className={Style.transactionInput}
              type='number'
              name='transactionAmount'
              placeholder='Transaction amount...'
              onChange={(e) => {
                setTransactionAmount(Number(e.target.value));
              }}
              required
            />
          </label>
          <Button buttonText='Add transaction' variant='primary' />
          <Button
            buttonText='Cancel'
            variant='secondary'
            click={() => {
              setShowTransactionForm(false);
            }}
          />
        </form>
      ) : (
        <Button
          buttonText='Add new transaction'
          variant='primary'
          click={() => {
            setShowTransactionForm(true);
          }}
        />
      )}
    </div>
  );
};

export default CreateTransaction;
