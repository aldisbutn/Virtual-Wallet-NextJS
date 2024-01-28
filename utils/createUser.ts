import bcryptjs from 'bcryptjs';

type CreateUserProps = {
  username: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  country: string;
};

export const createUser = async (props: CreateUserProps) => {
  const hashedPassword = bcryptjs.hashSync(props.password, 10);
  try {
    const response = await fetch('http://localhost:3000/api/users', {
      method: 'POST',
      body: JSON.stringify({ ...props, password: hashedPassword }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    console.log(response);
  } catch (error) {
    console.log(error);
  }
};
