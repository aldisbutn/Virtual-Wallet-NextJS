'use client';

const Home = () => {
  const createUser = async () => {
    const userData = {
      username: 'test',
      email: 'tester@test.com',
      password: 'test',
      firstName: 'test',
      lastName: 'test',
      country: 'test',
    };
    try {
      const response = await fetch('http://localhost:3000/api/users', {
        method: 'POST',
        body: JSON.stringify(userData),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const createWallet = async () => {
    const walletData = {
      userID: 2,
      name: 'test',
    };
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

  const createTransaction = async () => {
    const transactionData = {
      walletID: 1,
      type: 'deposit',
      amount: 100,
      date: new Date(),
      fraud: true,
    };
    try {
      const response = await fetch('http://localhost:3000/api/transactions', {
        method: 'POST',
        body: JSON.stringify(transactionData),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <h1>hello</h1>
      <button onClick={() => createUser()}>Create new user</button>
      <button onClick={() => createWallet()}>Create new wallet</button>
      <button onClick={() => createTransaction()}>Create new transaction</button>
    </>
  );
};

export default Home;
