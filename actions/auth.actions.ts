'use server';

import { prisma } from '@/db/prisma';
import bcrypt from 'bcryptjs';
import { logEvent } from '@/utils/sentry';

type ResponseResult = {
  success: boolean;
  message: string;
};

// Register new user
export async function registerUser(
  prevState,
  formData: FormData,
): Promise<ResponseResult> {
  try {
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    if (!name || !email || !password) {
      logEvent(
        'Validator error: Missing register fields',
        'auth',
        { name, email },
        'warning',
      );

      return { success: false, message: 'All fields are required' };
    }

    // Check if user exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      logEvent(
        `Registration failed: User already exists - ${email}`,
        'auth',
        { email },
        'warning',
      );

      return { success: false, message: 'User already exists' };
    }
  } catch (error) {}
}
