'use client';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';

import { useSearchParams, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { toast } from '@/components/ui/use-toast';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { Eye, EyeOff, Loader2 } from 'lucide-react';

export const authSchema = z.object({
  name: z.string().optional(),
  email: z.string().email({ message: 'Enter a valid email address' }),
  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters' }),
});

export type UserFormValue = z.infer<typeof authSchema>;

export default function UserAuthForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

  const defaultValues = {
    name: '',
    email: '',
    password: '',
  };

  const form = useForm<UserFormValue>({
    resolver: zodResolver(authSchema),
    defaultValues,
  });

  // Clear error when form values change
  useEffect(() => {
    if (authError) {
      const subscription = form.watch(() => setAuthError(null));
      return () => subscription.unsubscribe();
    }
  }, [form, authError]);

  const onSubmit = async (data: UserFormValue) => {
    setLoading(true);
    setAuthError(null);

    try {
      const result = await signIn('credentials', {
        redirect: false,
        name: data.name,
        email: data.email,
        password: data.password,
        callbackUrl: callbackUrl ?? '/dashboard',
      });

      if (result?.error) {
        setAuthError(
          result.error === 'CredentialsSignin'
            ? 'Invalid email or password'
            : result.error
        );
        toast({
          title: 'Authentication failed',
          description:
            result.error === 'CredentialsSignin'
              ? 'Invalid email or password'
              : result.error,
          variant: 'destructive',
        });
      } else {
        toast({
          title: 'Success',
          description: 'Sign in successful',
          variant: 'default',
        });

        // First refresh to update the session
        await router.refresh();

        // Use a small delay to ensure session is properly established
        setTimeout(() => {
          // Use window.location for a full page navigation to ensure proper session handling
          window.location.href = callbackUrl ?? '/dashboard';
        }, 100);
      }
    } catch (error: any) {
      setAuthError(error?.message || 'An unexpected error occurred');
      toast({
        title: 'Error',
        description: error?.message || 'An unexpected error occurred',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      {authError && (
        <div
          className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6"
          role="alert"
        >
          <p className="font-medium">{authError}</p>
          {authError.includes('permission') && (
            <p className="text-sm mt-1">
              Please contact your administrator for access.
            </p>
          )}
        </div>
      )}

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-6"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xl text-neutral-600">
                  Name (optional)
                </FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Enter your name..."
                    disabled={loading}
                    className="w-full text-xl"
                    autoComplete="name"
                    autoFocus
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xl text-neutral-600">
                  Email <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="Enter your email..."
                    disabled={loading}
                    className="w-full text-xl"
                    autoComplete="email"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <div className="flex justify-between items-center">
                  <FormLabel className="text-xl text-neutral-600">
                    Password <span className="text-red-500">*</span>
                  </FormLabel>
                </div>
                <div className="relative">
                  <FormControl>
                    <Input
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Enter your password..."
                      disabled={loading}
                      className="w-full text-xl pr-10"
                      autoComplete="current-password"
                      {...field}
                    />
                  </FormControl>
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    tabIndex={-1}
                  >
                    {showPassword ? (
                      <EyeOff size={20} aria-hidden="true" />
                    ) : (
                      <Eye size={20} aria-hidden="true" />
                    )}
                    <span className="sr-only">
                      {showPassword ? 'Hide password' : 'Show password'}
                    </span>
                  </button>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            disabled={loading}
            variant={'outline'}
            className="ml-auto w-full textGradient text-xl mt-8 relative"
            type="submit"
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Signing in...
              </>
            ) : (
              'Sign in'
            )}
          </Button>
        </form>
      </Form>

      <div className="relative mt-8">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <Link
            href="/"
            className="px-4 py-2 bg-background hover:text-secondary text-muted-foreground rounded-md transition-colors"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </>
  );
}
