'use client';

import { DefaultPageLayout } from '~/components/Layouts/DefaultPageLayout';
import { LoginForm } from '~/components/login/LoginForm';

export default function LoginPage() {
  return (
    <DefaultPageLayout>
      <div className="w-full h-full flex justify-center items-center">
        <LoginForm />
      </div>
    </DefaultPageLayout>
  );
}