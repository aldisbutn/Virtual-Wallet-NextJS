'use client';
import { createUser } from '@/utils/createUser';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import Style from '@/components/RegisterForm/RegisterForm.module.css';
import Button from '../Buttons/Button/Button';

const RegisterForm = () => {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/auth/login';

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await createUser({
      username,
      email,
      password,
      firstName,
      lastName,
    });
    router.push(callbackUrl);
  };
  return (
    <div className={Style.registerWrapper}>
      <h1 className={Style.registerMainHeading}>Create your account</h1>
      <br />
      <hr className={Style.registerHR} />
      <br />
      <form onSubmit={onSubmit} className={Style.registerForm}>
        <div className={Style.inputWrapper}>
          <input
            required
            type='text'
            name='username'
            value={username}
            placeholder='Username'
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            className={Style.inputField}
          />
          <input
            required
            type='email'
            name='email'
            value={email}
            placeholder='Email'
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            className={Style.inputField}
          />
          <input
            required
            type='password'
            name='password'
            value={password}
            placeholder='Password'
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            className={Style.inputField}
          />
          <input
            required
            type='text'
            name='firstName'
            value={firstName}
            placeholder='First Name'
            onChange={(e) => {
              setFirstName(e.target.value);
            }}
            className={Style.inputField}
          />
          <input
            required
            type='text'
            name='lastName'
            value={lastName}
            placeholder='Last Name'
            onChange={(e) => {
              setLastName(e.target.value);
            }}
            className={Style.inputField}
          />
        </div>
        <Button buttonText={'Register'} variant={'primary'} />
      </form>
      <br />
      <hr className={Style.registerHR} />
      <br />
      <div>
        <h2 className={Style.registerHeading}>
          <Link href={'/auth/login'} className={Style.registerLink}>
            Login{' '}
          </Link>
          if you already have a account
        </h2>
      </div>
    </div>
  );
};

export default RegisterForm;
