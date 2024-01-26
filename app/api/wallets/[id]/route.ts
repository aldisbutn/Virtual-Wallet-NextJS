import { executeQuery } from '@/services/db';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async (req: NextRequest, { params }: { params: { id: number } }, res: NextResponse) => {
  try {
    const userID = params.id;
    const wallet = await executeQuery({
      query: 'SELECT * FROM wallets WHERE userID = ?',
      values: [userID],
    });
    return NextResponse.json(wallet);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: 'Error getting wallet' }, { status: 500 });
  }
};

export const PUT = async (req: NextRequest, { params }: { params: { id: number } }, res: NextResponse) => {
  try {
    const walletID = params.id;
    const { name } = await req.json();
    await executeQuery({
      query: 'UPDATE wallets SET name = ? WHERE walletID = ?',
      values: [name, walletID],
    });
    return NextResponse.json({ message: 'Wallet updated' }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: 'Error updating wallet' }, { status: 500 });
  }
};

export const DELETE = async (req: NextRequest, { params }: { params: { id: number } }, res: NextResponse) => {
  try {
    const walletID = params.id;
    await executeQuery({
      query: 'DELETE FROM transactions WHERE walletID = ?',
      values: [walletID],
    });
    await executeQuery({
      query: 'DELETE FROM wallets WHERE walletID = ?',
      values: [walletID],
    });
    return NextResponse.json({ message: 'Wallet deleted' }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: 'Error deleting wallet' }, { status: 500 });
  }
};
