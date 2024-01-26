import { executeQuery } from '@/services/db';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async (req: NextRequest, { params }: { params: { id: number } }, res: NextResponse) => {
  try {
    const transactionID = params.id;
    const transaction = await executeQuery({
      query: 'SELECT * FROM transactions WHERE transactionID = ?',
      values: [transactionID],
    });
    return NextResponse.json(transaction);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: 'Error getting transaction' }, { status: 500 });
  }
};

export const PUT = async (req: NextRequest, { params }: { params: { id: number } }, res: NextResponse) => {
  try {
    const transactionID = params.id;
    const { fraud } = await req.json();
    await executeQuery({
      query: 'UPDATE transactions SET fraud = ? WHERE transactionID = ?',
      values: [fraud, transactionID],
    });
    return NextResponse.json({ message: 'Transaction updated' }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: 'Error updating transaction' }, { status: 500 });
  }
};

export const DELETE = async (req: NextRequest, { params }: { params: { id: number } }, res: NextResponse) => {
  try {
    const transactionID = params.id;
    await executeQuery({
      query: 'DELETE FROM transactions WHERE transactionID = ?',
      values: [transactionID],
    });
    return NextResponse.json({ message: 'Transaction deleted' }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: 'Error deleting transaction' }, { status: 500 });
  }
};
