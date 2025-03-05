import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

import {initPocketBase} from './lib/pocketbase';

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
    const pb = await initPocketBase();
    const token = request.cookies.get('pb_auth')?.value;
    pb.authStore.save(token ?? '');

    const response = NextResponse.next()
    
    try {
          if (!(pb.authStore.isValid && await pb.collection('users').authRefresh())) {
                throw new Error('Invalid auth token');
          }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (e) {
        pb.authStore.clear();
        
        const url = request.nextUrl.clone();
        url.pathname = '/auth/login';

        const redirectResponse = NextResponse.redirect(url);
        redirectResponse.cookies.delete('pb_auth');
        return redirectResponse;
    }

    return response
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: [
        '/((?!auth|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
    ]
}