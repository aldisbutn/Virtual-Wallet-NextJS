'use client';

import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import { ChangeEvent, useState } from 'react';

const Login = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formValues, setFormValues] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');

  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/wallets';

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      setFormValues({ email: '', password: '' });

      const res = await signIn('credentials', {
        redirect: false,
        email: formValues.email,
        password: formValues.password,
        callbackUrl,
      });

      setLoading(false);

      console.log(res);
      if (!res?.error) {
        router.push(callbackUrl);
      } else {
        setError('invalid email or password');
      }
    } catch (error: any) {
      setLoading(false);
      setError(error);
    }
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  return (
    <>
      <form onSubmit={onSubmit}>
        {error && <p>{error}</p>}
        <div>
          <input
            required
            type='email'
            name='email'
            value={formValues.email}
            onChange={handleChange}
            placeholder='Email address'
          />
        </div>
        <div>
          <input
            required
            type='password'
            name='password'
            value={formValues.password}
            onChange={handleChange}
            placeholder='Password'
          />
        </div>
        <button type='submit' style={{ backgroundColor: `${loading ? '#ccc' : '#3446eb'}` }} disabled={loading}>
          {loading ? 'loading...' : 'Sign In'}
        </button>
      </form>
      <div>
        <h2>Or register a new account</h2>
        <Link href={'/auth/register'}>
          Register
        </Link>
      </div>
    </>
  );
};

export default Login;
