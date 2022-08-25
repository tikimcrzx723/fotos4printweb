import { NextFetchEvent, NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(req: NextRequest | any, ev: NextFetchEvent) {
  const session: any = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });

  if (session) {
    try {
      const slug = req.page.params.slug;
      if (session.user.role === 'federal' || session.user.role === 'admin') {
        return NextResponse.redirect(`/product/federal/${slug}`);
      } else if (session.user.role === 'frequent') {
        return NextResponse.redirect(`/product/frequent/${slug}`);
      } else {
        return NextResponse.next();
      }
    } catch (error) {
      const url = req.nextUrl.clone();
      const params = req.page.params.slug;
      if (session.user.role === 'federal' || session.user.role === 'admin') {
        return NextResponse.redirect(`${url.origin}/product/federal/${params}`);
      } else if (session.user.role === 'frequent') {
        return NextResponse.redirect(
          `${url.origin}/product/frequent/${params}`
        );
      } else {
        return NextResponse.next();
      }
    }
  }

  return NextResponse.next();
}
