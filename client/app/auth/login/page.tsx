import { AuthForm } from '@/components/auth/auth-form';
import { LoginForm } from '@/components/auth/login-form';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sign In',
  description: 'Sign in to your account',
};

export default function LoginPage() {
  return (
    <AuthForm
      title="Sign In"
      description="Enter your credentials to access your account"
    >
      <LoginForm />
    </AuthForm>
  );
}
