'use client';

import { createUser } from '@/utils/createUser';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import { useState } from 'react';

const Register = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [country, setCountry] = useState('');


  

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
      country,
    });
    router.push(callbackUrl);
  };

  return (
    <>
      <form onSubmit={onSubmit}>
        <label>
          <h2>Username</h2>
          <input
            required
            type='text'
            name='username'
            value={username}
            placeholder='Username'
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
        </label>
        <label>
          <h2>Email</h2>
          <input
            required
            type='email'
            name='email'
            value={email}
            placeholder='Email'
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </label>
        <label>
          <h2>Password</h2>
          <input
            required
            type='password'
            name='password'
            value={password}
            placeholder='Password'
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </label>
        <label>
          <h2>First Name</h2>
          <input
            required
            type='text'
            name='firstName'
            value={firstName}
            placeholder='First Name'
            onChange={(e) => {
              setFirstName(e.target.value);
            }}
          />
        </label>
        <label>
          <h2>Last Name</h2>
          <input
            required
            type='text'
            name='lastName'
            value={lastName}
            placeholder='Last Name'
            onChange={(e) => {
              setLastName(e.target.value);
            }}
          />
        </label>
        <label>
          <h2>Country</h2>
          <input
            required
            type='text'
            name='country'
            value={country}
            placeholder='Country'
            onChange={(e) => {
              setCountry(e.target.value);
            }}
          />
        </label>
        <button type='submit' style={{ backgroundColor: `${loading ? '#ccc' : '#3446eb'}` }} disabled={loading}>
          {loading ? 'loading...' : 'Register'}
        </button>
      </form>
      <div>
        <h2>Already have a account?</h2>
        <Link href={'/auth/login'}>Login</Link>
      </div>
    </>
  );
};

export default Register;
