import { executeQuery } from '@/services/db';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async (req: NextRequest, res: NextResponse) => {
  try {
    const users = await executeQuery({
      query: 'SELECT * FROM users',
      values: [],
    });
    return NextResponse.json(users);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: 'Error getting users' }, { status: 500 });
  }
};

export const POST = async (req: NextRequest, res: NextResponse) => {
  try {
    const { username, email, password, firstName, lastName } = await req.json();
    await executeQuery({
      query: 'INSERT INTO users (username, email, password, firstName, lastName) VALUES (?, ?, ?, ?, ?)',
      values: [username, email, password, firstName, lastName],
    });
    return NextResponse.json({ message: 'User created' }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: 'Error creating user' }, { status: 500 });
  }
};
