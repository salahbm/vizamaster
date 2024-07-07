'use client';

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { emailSchema, useSendEmail } from '@/hooks/email/useEmail';
import { useRouter } from 'next/navigation';

export default function ContactForm() {
  const { mutateAsync: sendEmail, isPending } = useSendEmail();
  const router = useRouter();

  const { register, handleSubmit, formState } = useForm<
    z.infer<typeof emailSchema>
  >({
    resolver: zodResolver(emailSchema),
  });

  const { isSubmitting, isValid, errors } = formState;

  const onSubmit = async (values: z.infer<typeof emailSchema>) => {
    await sendEmail(values);
    router.refresh();
  };

  return (
    <Card className="w-full space-y-8">
      <CardHeader className="space-y-2">
        <CardTitle className="text-3xl font-bold textGradient">
          Contact us
        </CardTitle>
        <CardDescription className="text-gray-500 dark:text-gray-400">
          Fill out the form below and we&apos;ll get back to you as soon as
          possible.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4 text-left">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              placeholder="Enter your name"
              {...register('name')}
              className={errors.name ? 'border-red-500' : ''}
            />
            {errors.name && (
              <span className="text-red-500">{errors.name.message}</span>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              placeholder="Enter your email"
              type="email"
              {...register('email')}
              className={errors.email ? 'border-red-500' : ''}
            />
            {errors.email && (
              <span className="text-red-500">{errors.email.message}</span>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="message">Message</Label>
            <Textarea
              id="message"
              placeholder="Enter your message"
              className={`min-h-[100px] ${
                errors.message ? 'border-red-500' : ''
              }`}
              {...register('message')}
            />
            {errors.message && (
              <span className="text-red-500">{errors.message.message}</span>
            )}
          </div>
          <Button
            type="submit"
            className="text-white"
            disabled={isSubmitting || !isValid}
          >
            {isSubmitting ? 'Sending...' : 'Send message'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
