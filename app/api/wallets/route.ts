import { executeQuery } from '@/services/db';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async (req: NextRequest, res: NextResponse) => {
  try {
    const wallets = await executeQuery({
      query: 'SELECT * FROM wallets',
      values: [],
    });
    return NextResponse.json(wallets);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: 'Error getting wallets' }, { status: 500 });
  }
};

export const POST = async (req: NextRequest, res: NextResponse) => {
  try {
    const { userID, name } = await req.json();
    await executeQuery({
      query: 'INSERT INTO wallets (userID, name) VALUES (?, ?)',
      values: [userID, name],
    });
    return NextResponse.json({ message: 'Wallet created' }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: 'Error creating wallet' }, { status: 500 });
  }
};
