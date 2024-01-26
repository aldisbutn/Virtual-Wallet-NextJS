export const createTransaction = async () => {
  const transactionData = {
    walletID: 1,
    type: 'deposit',
    amount: 100,
    date: new Date(),
    fraud: true,
  };
  try {
    const response = await fetch('http://localhost:3000/api/transactions', {
      method: 'POST',
      body: JSON.stringify(transactionData),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    console.log(response);
  } catch (error) {
    console.log(error);
  }
};
