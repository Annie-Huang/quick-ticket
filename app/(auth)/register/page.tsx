import RegisterForm from '@/app/(auth)/register/register-form';

// What is the point of doing this? To just shift 'use client' to child component and make this server component.
const RegisterPage = () => {
  return <RegisterForm />;
};

export default RegisterPage;
