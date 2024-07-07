import { toast } from '@/components/ui/use-toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { z } from 'zod';
import emailjs from '@emailjs/browser';

export const emailSchema = z.object({
  name: z.string().min(1, {
    message: 'Name is required',
  }),
  email: z.string().email({ message: 'Invalid email' }),
  message: z.string().min(1, {
    message: 'Message is required',
  }),
});

export const sendEmail = async (data: z.infer<typeof emailSchema>) => {
  try {
    await emailjs.send(
      process.env.NEXT_PUBLIC_MAIL_SERVICE_ID!,
      process.env.NEXT_PUBLIC_MAIL_TEMPLATE_ID!,
      {
        from_name: data.name,
        to_name: 'BS GROUP',
        from_email: data.email,
        to_email: 'main@bsglobal.uz',
        message: data.message,
      },
      process.env.NEXT_PUBLIC_MAIL_ACCOUNT_PK!
    );
  } catch (error: any) {
    console.log(error);
  }
};

export const useSendEmail = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: sendEmail,
    async onSuccess() {
      await queryClient.invalidateQueries({ queryKey: ['email'] });
      toast({ title: 'Email sent successfully' });
    },
    async onError(error) {
      toast({
        title: "I didn't receive your message 😢",
        description:
          error?.message || 'An error occurred while sending your message.',
        variant: 'destructive',
      });
    },
  });
};
