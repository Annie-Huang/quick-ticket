'use client';

import { useRouter } from 'next/navigation';
import { useActionState } from 'react';
import { logoutUser } from '@/actions/auth.actions';

const LogoutButton = () => {
  const router = useRouter();
  const initialState = {
    success: false,
    message: '',
  };

  const [state, formAction] = useActionState(logoutUser, initialState);

  return (
    <form action={formAction}>
      <button
        type='submit'
        className='bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition'
      >
        Logout
      </button>
    </form>
  );
};

export default LogoutButton;
