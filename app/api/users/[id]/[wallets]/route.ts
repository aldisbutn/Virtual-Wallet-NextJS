import { executeQuery } from '@/services/db';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async (req: NextRequest, { params }: { params: { id: number } }, res: NextResponse) => {
  try {
    const userID = params.id;
    const wallet = (await executeQuery({
      query: 'SELECT * FROM wallets WHERE userID = ?',
      values: [userID],
    })) as WalletType[];
    return NextResponse.json(wallet);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: 'Error getting wallet' }, { status: 500 });
  }
};
