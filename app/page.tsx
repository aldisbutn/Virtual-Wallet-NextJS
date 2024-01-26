const Home = () => {
  const bcrypt = require('bcrypt');
  const password = 'aldis123';

  const createPassword = async (password: string) => {
    const pass = await bcrypt.hash(password, 10);
    return pass
  } 
  const date = new Date();
  const date2 = '2021-04-07 12:00:00'
  return (
    <>
      <h1>hello</h1>
      {createPassword(password)}
      <br />
      {date.toLocaleString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' })}
      <br />
      {date2.toLocaleString()}
    </>
  );
};

export default Home;
