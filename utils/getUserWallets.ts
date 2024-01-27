export const getUserWallets = async (userID: number) => {
  try {
    const response = await fetch(`http://localhost:3000/api/wallets/${userID}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log('Error:', error);

  }
};
