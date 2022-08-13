import { NextFetchEvent, NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
// import { jwt } from '../../utils';

export async function middleware(req: NextRequest | any, ev: NextFetchEvent) {
  const session: any = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });

  const validRoles = ['client'];

  if (session === null) {
    console.log(session);
    return NextResponse.next();
  } else if (!validRoles.includes(session.user.role)) {
    try {
      return NextResponse.redirect('/');
    } catch (error) {
      const url = req.nextUrl.clone();
      return NextResponse.redirect(`${url.origin}/`);
    }
  }

  return NextResponse.next();
}
