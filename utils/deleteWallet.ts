const deleteWallet = async (walletID: number) => {
  try {
    const response = await fetch(`http://localhost:3000/api/wallets/${walletID}`, {
      method: 'DELETE',
    });
    console.log(response);
    if (response.ok) {
      console.log('Wallet deleted');
    } else {
      console.log('Error deleting wallet');
    }
  } catch (error) {
    console.log(error);
  }
};

export default deleteWallet;
