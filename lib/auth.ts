import { SignJWT } from 'jose';

const secret = new TextEncoder().encode(process.env.AUTH_SECRET_KEY);
const cookieName = 'auth-token';

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
  } catch (e) {}
}
