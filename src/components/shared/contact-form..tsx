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
import { useTranslations } from 'next-intl';

export default function ContactForm() {
  const { mutateAsync: sendEmail, isPending } = useSendEmail();
  const router = useRouter();
  const t = useTranslations('ContactForm');

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
          {t('title')}
        </CardTitle>
        <CardDescription className="text-gray-500 dark:text-gray-400">
          {t('description')}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4 text-left">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">{t('labels.name')}</Label>
            <Input
              id="name"
              placeholder={t('placeholders.name')}
              {...register('name')}
              className={errors.name ? 'border-red-500' : ''}
            />
            {errors.name && (
              <span className="text-red-500">{t('errors.name')}</span>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">{t('labels.email')}</Label>
            <Input
              id="email"
              placeholder={t('placeholders.email')}
              type="email"
              {...register('email')}
              className={errors.email ? 'border-red-500' : ''}
            />
            {errors.email && (
              <span className="text-red-500">{t('errors.email')}</span>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="message">{t('labels.message')}</Label>
            <Textarea
              id="message"
              placeholder={t('placeholders.message')}
              className={`min-h-[100px] ${
                errors.message ? 'border-red-500' : ''
              }`}
              {...register('message')}
            />
            {errors.message && (
              <span className="text-red-500">{t('errors.message')}</span>
            )}
          </div>
          <Button
            type="submit"
            className="text-white"
            disabled={isSubmitting || !isValid}
          >
            {isSubmitting ? t('submit.sending') : t('submit.default')}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
