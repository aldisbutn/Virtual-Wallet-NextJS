export const getWalletTransactions = async (walletID: number) => {
  try {
    const response = await fetch(`http://localhost:3000/api/transactions/${walletID}`);
    const data = await response.json();
    console.log(data);
    return data[0];
  } catch (error) {
    console.log(error);
  }
};
