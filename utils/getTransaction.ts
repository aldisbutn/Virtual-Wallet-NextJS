export const getTransaction = async (transactionID: number) => {
  try {
    const response = await fetch(`http://localhost:3000/api/transactions/${transactionID}`, {
      next: {
        tags: [`transaction-${transactionID}`],
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};
