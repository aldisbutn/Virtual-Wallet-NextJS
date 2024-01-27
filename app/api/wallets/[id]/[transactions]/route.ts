import { executeQuery } from '@/services/db';
import { TransactionType } from '@/types/transactionType';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async (req: NextRequest, { params }: { params: { id: number } }, res: NextResponse) => {
  try {
    const walletID = params.id;
    const transaction = (await executeQuery({
      query: 'SELECT * FROM transactions WHERE walletID = ?',
      values: [walletID],
    })) as TransactionType[];
    return NextResponse.json(transaction);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: 'Error getting transaction' }, { status: 500 });
  }
};
