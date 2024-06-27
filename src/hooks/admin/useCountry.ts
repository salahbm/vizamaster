import { toast } from '@/components/ui/use-toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { z } from 'zod';

export const formSchema = z.object({
  id: z.string().optional(),
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

export const createCountry = async (data: z.infer<typeof formSchema>) => {
  const response = await axios.post('/api/country', data);
  return response.data;
};

export const useCreateCountry = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: createCountry,
    async onSuccess(data) {
      await queryClient.invalidateQueries({ queryKey: ['countries'] });
      toast({ title: 'Country created successfully' });
      router.push(`/posts`);
    },
    async onError() {
      toast({ title: 'Something went wrong' });
    },
  });
};

// update country
export const updateCountry = async (data: z.infer<typeof formSchema>) => {
  if (!data.id) {
    throw new Error('Country ID is required for updating');
  }
  const response = await axios.put(`/api/country/${data.id}`, data);
  return response.data;
};

export const useUpdateCountry = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: updateCountry,
    async onSuccess(data) {
      await queryClient.invalidateQueries({ queryKey: ['countries'] });
      toast({ title: 'Country updated successfully' });
      router.push(`/vacancy`);
    },
    async onError() {
      toast({ title: 'Something went wrong' });
    },
  });
};
