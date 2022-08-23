import { NextFetchEvent, NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(req: NextRequest | any, ev: NextFetchEvent) {
  const session: any = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });

  if (!session) {
    try {
      const requestedPage = req.page.name;
      return NextResponse.redirect(`/product/client/${req.page.params.slug}`);
    } catch (error) {
      const url = req.nextUrl.clone();
      return NextResponse.redirect(
        `${url.origin}/product/client/${req.page.params.slug}`
      );
    }
  }

  const validRoles = ['frequent'];

  if (!validRoles.includes(session.user.role)) {
    try {
      const param = req.page.name;
      if (session.user.role === 'federal' || session.user.role === 'admin') {
        return NextResponse.redirect(`/product/federal/${param}`);
      } else {
        return NextResponse.redirect(`/product/client/${param}`);
      }
    } catch (error) {
      const url = req.nextUrl.clone();
      const param = req.page.name;
      if (session.user.role === 'federal' || session.user.role === 'admin') {
        return NextResponse.redirect(`${url.origin}/product/federal/${param}`);
      } else {
        return NextResponse.redirect(`${url.origin}/product/client/${param}`);
      }
    }
  }

  return NextResponse.next();
}
