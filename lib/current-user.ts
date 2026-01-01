import { getAuthCookie, verifyAuthToken } from '@/lib/auth';

type AuthPayload = {
  userId: string;
};

export async function getCurrentUser() {
  try {
    const token = await getAuthCookie();
    if (!token) return null;

    // The reason we know it contains userId in the payload is because
    // in auth.action.ts' registerUser, method, we have:
    // const token = await signAuthToken({ userId: user.id });
    const payload = (await verifyAuthToken(token)) as AuthPayload;

    if (!payload?.userId) return null;
  } catch (error) {}
}
