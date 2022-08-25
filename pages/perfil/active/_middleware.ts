import { NextFetchEvent, NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(req: NextRequest | any, ev: NextFetchEvent) {
  const session: any = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });

  if (session) {
    try {
      return NextResponse.redirect(`/`);
    } catch (error) {
      const url = req.nextUrl.clone();
      return NextResponse.redirect(`${url.origin}/`);
    }
  }

  return NextResponse.next();
}
