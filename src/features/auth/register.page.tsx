import { AuthLayout } from './ui/auth-layout';
import { RegisterForm } from './ui/register-form';

function RegisterPage() {
  return (
    <div>
      <AuthLayout children={<RegisterForm />} title={'Регистрация'} />
    </div>
  );
}

export const Component = RegisterPage;
