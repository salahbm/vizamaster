import { Metadata } from 'next';
import UserAuthForm from '../../_components/user-auth-form';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'Sign In | VIZA MASTER',
  description: 'Sign in to your VIZA MASTER account',
};

export default function AuthenticationPage() {
  return (
    <div className="relative min-h-screen flex-col items-center justify-center flex py-12">
      <div
        className="flex items-center p-6 lg:p-8 shadow-xl bg-white rounded-xl border border-neutral-200 max-w-md w-full"
        aria-labelledby="signin-heading"
      >
        <div className="mx-auto flex w-full flex-col justify-center space-y-6">
          <div className="flex flex-col space-y-2 text-center">
            <h1
              id="signin-heading"
              className="text-3xl font-semibold tracking-tight text-neutral-700"
            >
              Welcome back
            </h1>
            <p className="text-sm text-muted-foreground">
              Sign in to your account to continue
            </p>
          </div>

          <Suspense
            fallback={
              <div className="h-[300px] flex items-center justify-center">
                Loading...
              </div>
            }
          >
            <UserAuthForm />
          </Suspense>
        </div>
      </div>

      {/* Background pattern and gradient */}
      <div
        className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"
        aria-hidden="true"
      >
        <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-fuchsia-400 opacity-20 blur-[100px]"></div>
      </div>
    </div>
  );
}
