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
  countryName: z.string(),
});

export const createVacancy = async (
  data: z.infer<typeof vacancyFormSchema>
) => {
  const response = await axios.post(
    `/api/country/${data.countryId}/vacancy`,
    data
  );
  return response.data;
};

export const updateVacancy = async ({
  data,
  vacancyId,
}: {
  data: z.infer<typeof vacancyFormSchema>;
  vacancyId: string;
}) => {
  if (!vacancyId) {
    throw new Error('Vacancy ID is required for updating');
  }
  const response = await axios.patch(
    `/api/country/${data.countryId}/vacancy/${vacancyId}`,
    data
  );
  return response.data;
};

const deleteUploadImg = async (value: string) => {
  const url = value.split('/').pop() ?? ''; // Extracts the filename with extension
  console.log(`url:`, url);

  const response = await axios.delete('/api/uploadthing', {
    data: {
      url,
    },
  });

  return response.data;
};

export const useCreateVacancy = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const mutateAsyncDeleteUploadImg = useMutation({
    mutationFn: deleteUploadImg,
    async onSuccess() {
      await queryClient.invalidateQueries({ queryKey: ['vacancies'] });
      toast({ title: 'Deleted successfully' });
      router.refresh();
    },
    async onError() {
      toast({ title: 'Something went wrong' });
    },
  });

  const mutateCreateVacancy = useMutation({
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

  const mutateUpdateVacancy = useMutation({
    mutationFn: updateVacancy,
    async onSuccess(data) {
      await queryClient.invalidateQueries({ queryKey: ['vacancies'] });
      toast({ title: 'Vacancy updated successfully' });
      router.push(`/posts`);
    },
    async onError() {
      toast({ title: 'Something went wrong' });
    },
  });

  return {
    mutateAsyncDeleteUploadImg,
    mutateCreateVacancy,
    mutateUpdateVacancy,
  };
};
