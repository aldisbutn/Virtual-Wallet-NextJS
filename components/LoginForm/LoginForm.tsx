'use client';
import { signIn } from 'next-auth/react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import Style from '@/components/LoginForm/LoginForm.module.css';
import Button from '../Buttons/Button/Button';
import Link from 'next/link';

const LoginForm = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/wallets';

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setEmail('');
      setPassword('');

      const res = await signIn('credentials', {
        redirect: false,
        email,
        password,
        callbackUrl,
      });

      console.log(res);
      if (!res?.error) {
        router.push(callbackUrl);
      } else {
        setError('invalid email or password');
      }
    } catch (error: any) {
      setError(error);
    }
  };

  return (
    <div className={Style.loginWrapper}>
      <form onSubmit={onSubmit} className={Style.loginForm}>
        {error && <p>{error}</p>}
        <div className={Style.inputWrapper}>
          <input
            required
            type='email'
            name='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder='Email address'
            className={Style.inputField}
          />
          <input
            required
            type='password'
            name='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder='Password'
            className={Style.inputField}
          />
        </div>
        <Button buttonText={'Sign In'} variant={'primary'} />
      </form>
      <br />
      <hr className={Style.loginHR} />
      <br />
      <div>
        <h2 className={Style.loginHeading}>
          Or{' '}
          <Link href={'/auth/register'} className={Style.loginLink}>
            register{' '}
          </Link>
          a new account
        </h2>
      </div>
    </div>
  );
};

export default LoginForm;
