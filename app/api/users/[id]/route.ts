import { executeQuery } from '@/services/db';
import { UserType } from '@/types/userType';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async (req: NextRequest, { params }: { params: { id: number } }, res: NextResponse) => {
  try {
    const userID = params.id;
    const user = (await executeQuery({
      query: 'SELECT * FROM users WHERE userID = ?',
      values: [userID],
    })) as UserType[];
    return NextResponse.json(user);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: 'Error getting user' }, { status: 500 });
  }
};
