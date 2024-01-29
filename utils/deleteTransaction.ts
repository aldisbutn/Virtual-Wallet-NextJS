const deleteTransaction = async (transactionID: number) => {
  try {
    const response = await fetch(`http://localhost:3000/api/transactions/${transactionID}`, {
      method: 'DELETE',
    });
    console.log(transactionID);
    if (response.ok) {
      console.log('Transaction deleted');
    } else {
      console.log('Error deleting transaction');
    }
  } catch (error) {
    console.log(error);
  }
};

export default deleteTransaction;
