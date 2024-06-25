import { toast } from '@/components/ui/use-toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { z } from 'zod';

export const formSchema = z.object({
  emoji: z.string().min(1, {
    message: 'Country emoji is required',
  }),
  name: z.string().min(1, {
    message: 'Country name is required',
  }),
  description: z.string().min(10, {
    message: 'Country description is required',
  }),
  title: z
    .string()
    .min(1, {
      message: 'Country title is required',
    })
    .optional(),
});

export const createCountry = async (courseData: z.infer<typeof formSchema>) => {
  const response = await axios.post('/api/country', courseData);
  return response.data;
};

export const useCreateCountry = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: createCountry,
    async onSuccess(data) {
      await queryClient.invalidateQueries({ queryKey: ['countries'] });
      // router.push(`/teacher/courses/${data.id}`);
      toast({ title: 'Course created successfully' });
    },
    async onError() {
      toast({ title: 'Something went wrong' });
    },
  });
};
