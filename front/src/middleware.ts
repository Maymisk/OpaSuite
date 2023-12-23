import { cookies as cookieStore } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export default async function middleware(req: NextRequest) {
	const res = NextResponse.next();

	const path = req.nextUrl.pathname;
	const cookies = cookieStore(),
		token = cookies.get('opaSuite.token')?.value,
		refresh_token = cookies.get('opaSuite.refresh_token')?.value;

	res.headers.set('authorization', token || '');
	res.headers.set('X-Refresh-Token', refresh_token || '');

	if (refresh_token && (path === '/login' || path === '/signUp'))
		return NextResponse.redirect(new URL('/', req.url));

	if (!refresh_token && path !== '/login' && path !== '/signUp')
		return NextResponse.redirect(new URL('/login', req.url));

	return res;
}

export const config = {
	matcher:
		'/((?!api|_next/static|_next/image|favicon.ico|favicon.png|.*.svg|.*.png|.*.jpg|.*.jpeg).*)',
};
