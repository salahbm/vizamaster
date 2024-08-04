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

const serviceID = process.env.MAIL_SERVICE_ID;
const templateID = process.env.MAIL_TEMPLATE_ID;
const accountID = process.env.MAIL_ACCOUNT_PK;

export const sendEmail = async (data: z.infer<typeof emailSchema>) => {
  if (!serviceID || !templateID || !accountID) {
    return toast({
      title: 'Error',
      description: 'Email service is not configured',
      variant: 'destructive',
    });
  }
  try {
    await emailjs.send(
      serviceID,
      templateID,
      {
        from_name: data.name,
        to_name: 'Inter Obmen',
        from_email: data.email,
        to_email: 'main@bsglobal.uz',
        message: data.message,
      },
      accountID
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
