export const createUser = async () => {
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