type EditTransactionProps = {
  transactionID: number;
  fraud: boolean;
};

const editTransaction = async ({ transactionID, fraud }: EditTransactionProps) => {
  try {
    const response = await fetch(`http://localhost:3000/api/transactions/${transactionID}`, {
      method: 'PUT',
      body: JSON.stringify({ fraud }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    console.log(response.ok ? 'Transaction updated' : 'Error updating transaction');
  } catch (error) {
    console.log(error);
  }
};

export default editTransaction;
