import { NextFetchEvent, NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(req: NextRequest | any, ev: NextFetchEvent) {
  const session: any = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });

  if (!session) {
    try {
      const slug = req.page.params.slug;
      return NextResponse.redirect(`/product/client/${slug}`);
    } catch (error) {
      const url = req.nextUrl.clone();
      const slug = req.page.params.slug;
      return NextResponse.redirect(`${url.origin}/product/client/${slug}`);
    }
  }

  const validRoles = ['admin', 'federal'];

  if (!validRoles.includes(session.user.role)) {
    try {
      const slug = req.page.params.slug;
      if (session.user.role === 'frequent') {
        return NextResponse.redirect(`/product/frequent/${slug}`);
      } else {
        return NextResponse.redirect(`/product/client/${slug}`);
      }
    } catch (error) {
      const url = req.nextUrl.clone();
      const slug = req.page.params.slug;
      if (session.user.role === 'frequent') {
        return NextResponse.redirect(`${url.origin}/product/frequent/${slug}`);
      } else {
        return NextResponse.redirect(`${url.origin}/product/client/${slug}`);
      }
    }
  }

  return NextResponse.next();
}
