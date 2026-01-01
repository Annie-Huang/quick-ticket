import { jwtVerify, SignJWT } from 'jose';
import { logEvent } from '@/utils/sentry';
import { cookies } from 'next/headers';

const secret = new TextEncoder().encode(process.env.AUTH_SECRET_KEY);
const cookieName = 'auth-token';

// Encrypt and sign token
export async function signAuthToken(payload: any) {
  try {
    const token = await new SignJWT(payload)
      .setProtectedHeader({
        alg: 'HS256',
      })
      .setIssuedAt()
      .setExpirationTime('7d')
      .sign(secret);

    return token;
  } catch (error) {
    logEvent('Token signing failed', 'auth', { payload }, 'error', error);
    throw new Error('Token signing failed');
  }
}

// Decrypt and verify token
export async function verifyAuthToken<T>(token: string): Promise<T> {
  try {
    const { payload } = await jwtVerify(token, secret);

    return payload as T;
  } catch (error) {
    logEvent(
      'Token decryption failed',
      'auth',
      { tokenSnippet: token.slice(0, 10) },
      'error',
      error,
    );
    throw new Error('Token decryption failed');
  }
}

// Set the auth cookie
export async function setAuthCookie(token: string) {
  try {
    const cookieStore = await cookies();
    cookieStore.set(cookieName, token, {
      httpOnly: true, // this stop javascript from accessing the token, make it more secure.
      sameSite: 'lax', // only top level get request if it is from other sites, not post request from other sites
      secure: process.env.NODE_ENV === 'production', // if it's production, it can only use https.
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 7 Days
    });
  } catch (error) {
    logEvent('Failed to set cookie', 'auth', { token }, 'error', error);
  }
}

// Get auth token from cookie
export async function getAuthCookie() {
  const cookieStore = await cookies();
  const token = cookieStore.get(cookieName);
  return token?.value;
}
