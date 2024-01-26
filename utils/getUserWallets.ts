export const getUserWallets = async (userID: number) => {
  try {
    const response = await fetch(`http://localhost:3000/api/wallets/${userID}`);
    const data = await response.json();
    console.log(data);
    return data[0];
  } catch (error) {
    console.log(error);
  }
};
