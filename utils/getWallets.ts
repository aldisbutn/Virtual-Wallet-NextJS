export const getWallets = async () => {
  try {
    const response = await fetch(`http://localhost:3000/api/wallets`, {
      next: {
        tags: [`wallets`],
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log('Error:', error);
  }
};
