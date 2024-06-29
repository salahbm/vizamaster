import { toast } from '@/components/ui/use-toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { z } from 'zod';

export const vacancyFormSchema = z.object({
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
  countryName: z.string(),
});

export const createVacancy = async (
  data: z.infer<typeof vacancyFormSchema>
) => {
  const response = await axios.post(
    `/api/vacancy/${data.countryId}/vacancy`,
    data
  );
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
