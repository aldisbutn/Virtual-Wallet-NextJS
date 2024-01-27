export const getUser = async (userID: number) => {
  try {
    const response = await fetch(`http://localhost:3000/api/users/${userID}`);
    const data = await response.json();
    return data[0];
  } catch (error) {
    console.log(error);
  }
};
