type CreateTransactionProps = {
  walletID: number;
  type: string;
  amount: number;
  date: string;
  fraud: boolean;
};

export const createTransaction = async (props: CreateTransactionProps) => {
  const transactionData = props;
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
