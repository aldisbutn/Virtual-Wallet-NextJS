type CreateWalletProps = {
  userID: number;
  name: string;
};

export const createWallet = async (props: CreateWalletProps) => {
  const walletData = props;
  try {
    const response = await fetch('http://localhost:3000/api/wallets', {
      method: 'POST',
      body: JSON.stringify(walletData),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    console.log(response);
  } catch (error) {
    console.log(error);
  }
};
