import { executeQuery } from '@/services/db';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async (req: NextRequest, res: NextResponse) => {
  try {
    const transactions = await executeQuery({
      query: 'SELECT * FROM transactions',
      values: [],
    });
    return NextResponse.json(transactions);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: 'Error getting transactions' }, { status: 500 });
  }
};

export const POST = async (req: NextRequest, res: NextResponse) => {
  try {
    const { walletID, type, amount, date, fraud } = await req.json();
    await executeQuery({
      query: 'INSERT INTO transactions (walletID, type, amount, date, fraud) VALUES (?, ?, ?, ?, ?)',
      values: [walletID, type, amount, date, fraud],
    });
    return NextResponse.json({ message: 'Transaction created' }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: 'Error creating transaction' }, { status: 500 });
  }
};
