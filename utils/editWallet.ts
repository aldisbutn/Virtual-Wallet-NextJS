type editWalletProps = {
  walletID: number;
  name: string;
};

const editWallet = async (props: editWalletProps) => {
  const { walletID, name } = props;
  try {
    const response = await fetch(`http://localhost:3000/api/wallets/${walletID}`, {
      method: 'PUT',
      body: JSON.stringify({ name, walletID }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    console.log(response);
    if (response.ok) {
      console.log('Wallet updated');
    } else {
      console.log('Error updating wallet');
    }
  } catch (error) {
    console.log(error);
  }
};

export default editWallet;
