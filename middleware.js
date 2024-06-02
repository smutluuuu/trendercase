import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(req) {
  // Token'ı request'ten al
  const token = await getToken({ req, secret: process.env.JWT_SECRET });

  // Ana sayfa ve diğer korumalı yolları tanımla
  const protectedPaths = ['/', '/protected', '/another-protected-path'];

  // Eğer istek korumalı bir yola ise ve token yoksa login sayfasına yönlendir
  if (protectedPaths.includes(req.nextUrl.pathname)) {
    if (!token) {
      return NextResponse.redirect(new URL('/login', req.url));
    }
  }

  // İsteğe devam et
  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/protected', '/another-protected-path'],
};