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
  }
}
