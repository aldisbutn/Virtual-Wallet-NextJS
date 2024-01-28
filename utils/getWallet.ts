export const getWallet = async (walletID: number) => {
  try {
    const response = await fetch(`http://localhost:3000/api/wallets/${walletID}`, {
      next: {
        tags: [`wallet-${walletID}`],
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log('Error:', error);
  }
};
