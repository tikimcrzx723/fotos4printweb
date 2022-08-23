import { NextFetchEvent, NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(req: NextRequest | any, ev: NextFetchEvent) {
  const session: any = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });

  if (!session) {
    try {
      const params = req.page.params.slug;
      return NextResponse.redirect(`/product/client/${params}`);
    } catch (error) {
      const url = req.nextUrl.clone();
      const params = req.page.params.slug;
      return NextResponse.redirect(`${url.origin}/product/client/${params}`);
    }
  }

  const validRoles = ['admin', 'federal'];

  if (!validRoles.includes(session.user.role)) {
    try {
      const params = req.page.name;
      if (session.user.role === 'frequent') {
        return NextResponse.redirect(`/product/frequent/${params}`);
      } else {
        return NextResponse.redirect(`/product/client/${params}`);
      }
    } catch (error) {
      const url = req.nextUrl.clone();
      const params = req.page.name;
      if (session.user.role === 'frequent') {
        return NextResponse.redirect(`${url.origin}/product/frequent/${params}`);
      } else {
        return NextResponse.redirect(`${url.origin}/product/client/${params}`);
      }
    }
  }

  return NextResponse.next();
}
