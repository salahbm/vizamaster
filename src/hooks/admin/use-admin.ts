import axios from 'axios';
import { z } from 'zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useToast } from '@/components/ui/use-toast';

export const formSchema = z.object({
  title: z.string().min(1, {
    message: 'Title is required',
  }),
});

export const signUp = async (courseData: z.infer<typeof formSchema>) => {
  const response = await axios.post('/api/admins/sign-up/', courseData);
  return response.data;
};

export const useCreateAdmin = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: signUp,
    async onSuccess(data) {
      await queryClient.invalidateQueries({ queryKey: ['admins'] });
      router.push(`/teacher/admins/sign-up/${data.id}`);
      toast({ title: 'Sign up successfully' });
    },
    async onError() {
      toast({
        title: 'Failed to sign up',
        description: 'Please try again',
      });
    },
  });
};
