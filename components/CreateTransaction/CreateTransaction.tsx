'use client';

import { createTransaction } from '@/utils/createTransaction';
import { FormEvent, useState } from 'react';

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
  };

  return (
    <div>
      {showTransactionForm ? (
        <form
          id='addTransactionForm'
          onSubmit={(e) => {
            handleAddTransaction(e);
          }}
        >
          <label>
            <h2>Transaction type</h2>
            <select
              id='transactionType'
              onChange={(e) => {
                setTransactionType(e.target.value);
              }}
            >
              <option disabled selected>Select type</option>
              <option value='deposit'>Deposit</option>
              <option value='withdrawal'>Withdrawal</option>
            </select>
          </label>
          <label>
            <h2>Enter amount</h2>
            <input
              type='number'
              name='transactionAmount'
              onChange={(e) => {
                setTransactionAmount(Number(e.target.value));
              }}
            />
          </label>
          <button>Add transaction</button>
        </form>
      ) : (
        <button
          onClick={() => {
            setShowTransactionForm(true);
          }}
        >
          Add new transaction
        </button>
      )}
    </div>
  );
};

export default CreateTransaction;
