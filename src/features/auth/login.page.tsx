import { AuthLayout } from './ui/auth-layout';
import { LoginForm } from './ui/login-form';

function LoginPage() {
  return (
    <div>
      <AuthLayout children={<LoginForm />} title={'Войти в аккаунт'} />
    </div>
  );
}

export const Component = LoginPage;
