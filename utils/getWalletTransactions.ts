export const getWalletTransactions = async (walletID: number) => {
  try {
    const response = await fetch(`http://localhost:3000/api/wallets/${walletID}/${walletID}`, {
      next: {
        tags: [`walletTransactions-${walletID}`],
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};
