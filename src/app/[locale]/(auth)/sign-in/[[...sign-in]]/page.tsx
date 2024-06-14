import { Metadata } from 'next';
import Link from 'next/link';

import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import UserAuthForm from '../../_components/user-auth-form';

export const metadata: Metadata = {
  title: 'Admin Sign Up',
  description: 'Admin authentication page',
};

export default function AuthenticationPage() {
  return (
    <div className="relative h-screen flex-col items-center justify-center flex">
      <div className="flex h-full items-center p-4 lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-3xl font-semibold tracking-tight">
              Log in an account
            </h1>
            <p className="text-sm text-muted-foreground">
              Enter your email below to create your account
            </p>
          </div>

          <UserAuthForm />
          <Link
            href="/sign-up"
            className={cn(
              buttonVariants({ variant: 'link' }),
              'hover:underline hover:underline-offset-8 text-lg'
            )}
          >
            Sign up
          </Link>
        </div>
      </div>
      <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
        <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-fuchsia-400 opacity-20 blur-[100px]"></div>
      </div>
    </div>
  );
}
