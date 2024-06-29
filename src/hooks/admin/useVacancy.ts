import { toast } from '@/components/ui/use-toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { z } from 'zod';

export const vacancyFormSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, {
    message: 'Vacancy name is required',
  }),
  title: z.string().optional(),
  description: z.string().min(10, {
    message: 'Vacancy description is required',
  }),
  imgUrl: z.string().optional(),
  countryId: z.string().optional(),
  isNew: z.boolean().optional(),
  isTrend: z.boolean().optional(),
  isActive: z.boolean().optional(),
  isDeadline: z.boolean().optional(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
});

interface TVacancyProps {
  data: z.infer<typeof vacancyFormSchema>;
  countryId: string;
}

export const createVacancy = async ({ data, countryId }: TVacancyProps) => {
  const response = await axios.post(`/api/vacancy/${countryId}vacancy`, data);
  return response.data;
};

export const useCreateVacancy = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: createVacancy,
    async onSuccess(data) {
      await queryClient.invalidateQueries({ queryKey: ['vacancies'] });
      toast({ title: 'Vacancy created successfully' });
      router.push(`/posts`);
    },
    async onError() {
      toast({ title: 'Something went wrong' });
    },
  });
};
