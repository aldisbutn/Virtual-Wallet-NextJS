export const getWalletTransactions = async () => {
  try {
    const response = await fetch(`http://localhost:3000/api/transactions`, {
      next: {
        tags: [`transactions`],
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};
