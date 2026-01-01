'use client';

import { useActionState } from 'react';
import { registerUser } from '@/actions/auth.actions';

const RegisterPage = () => {
  const initialState = {
    success: false,
    message: '',
  };

  const [state, formAction] = useActionState(registerUser, initialState);

  return <>Register</>;
};

export default RegisterPage;
