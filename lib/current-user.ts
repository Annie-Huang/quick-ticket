import { getAuthCookie } from '@/lib/auth';

type AuthPayload = {
  userId: string;
};

export async function getCurrentUser() {
  try {
    const token = await getAuthCookie();
    if (!token) return null;
  } catch (error) {}
}
