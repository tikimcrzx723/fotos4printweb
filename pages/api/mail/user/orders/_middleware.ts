import { NextFetchEvent, NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(req: NextRequest | any, ev: NextFetchEvent) {
  const session: any = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });

  if (!session) {
    try {
      return new Response(JSON.stringify({ message: 'Unauthorized' }), {
        status: 401,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    } catch (error) {
      console.log(error);
    }
  }

  const validRoles = ['client', 'admin', 'federal', 'frequent'];

  if (!validRoles.includes(session.user.role)) {
    try {
      return new Response(JSON.stringify({ message: 'Unauthorized' }), {
        status: 401,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    } catch (error) {
      console.log(error);
    }
  }

  return NextResponse.next();
}
