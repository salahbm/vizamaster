import { toast } from '@/components/ui/use-toast';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { z } from 'zod';

// Improved form schema with better validation
export const vacancyFormSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, {
    message: 'Vacancy name is required',
  }),
  title: z
    .string()
    .min(3, {
      message: 'Title should be at least 3 characters',
    })
    .optional()
    .or(z.literal('')),
  description: z.string().min(10, {
    message: 'Vacancy description is required (min 10 characters)',
  }),
  imgUrl: z.string().optional().or(z.literal('')),
  countryId: z
    .string({
      required_error: 'Country is required',
    })
    .min(1, {
      message: 'Country is required',
    }),
  isNew: z.boolean().default(true),
  isTrend: z.boolean().default(false),
  isActive: z.boolean().default(true),
  isDeadline: z.boolean().default(false),
  countryName: z.string({
    required_error: 'Country name is required',
  }),
});

export type VacancyFormValues = z.infer<typeof vacancyFormSchema>;

// API functions with better error handling
export const createVacancy = async (data: VacancyFormValues) => {
  if (!data.countryId) {
    throw new Error('Country ID is required');
  }

  try {
    const response = await axios.post(
      `/api/country/${data.countryId}/vacancy`,
      data
    );
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(
        error.response?.data?.message || 'Failed to create vacancy'
      );
    }
    throw error;
  }
};

export const updateVacancy = async ({
  data,
  vacancyId,
}: {
  data: VacancyFormValues;
  vacancyId: string;
}) => {
  if (!vacancyId) {
    throw new Error('Vacancy ID is required for updating');
  }
  if (!data.countryId) {
    throw new Error('Country ID is required');
  }

  try {
    const response = await axios.patch(
      `/api/country/${data.countryId}/vacancy/${vacancyId}`,
      data
    );
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(
        error.response?.data?.message || 'Failed to update vacancy'
      );
    }
    throw error;
  }
};

export const deleteVacancy = async ({
  vacancyId,
  countryId,
}: {
  vacancyId: string;
  countryId: string;
}) => {
  if (!vacancyId) {
    throw new Error('Vacancy ID is required for deleting');
  }
  if (!countryId) {
    throw new Error('Country ID is required');
  }

  try {
    const response = await axios.delete(
      `/api/country/${countryId}/vacancy/${vacancyId}`
    );
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(
        error.response?.data?.message || 'Failed to delete vacancy'
      );
    }
    throw error;
  }
};

export const fetchVacancy = async (vacancyId: string, countryId: string) => {
  if (!vacancyId || !countryId) {
    throw new Error('Vacancy ID and Country ID are required');
  }

  try {
    const response = await axios.get(
      `/api/country/${countryId}/vacancy/${vacancyId}`
    );
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(
        error.response?.data?.message || 'Failed to fetch vacancy'
      );
    }
    throw error;
  }
};

const deleteUploadImg = async (value: string) => {
  if (!value) {
    throw new Error('Image URL is required');
  }

  const url = value.split('/').pop() ?? '';
  if (!url) {
    throw new Error('Invalid image URL format');
  }

  try {
    const response = await axios.delete('/api/uploadthing', {
      data: { url },
    });
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(
        error.response?.data?.message || 'Failed to delete image'
      );
    }
    throw error;
  }
};

// Improved hook with better error handling and optimistic updates
export const useCreateVacancy = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const mutateAsyncDeleteUploadImg = useMutation({
    mutationFn: deleteUploadImg,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['vacancies'] });
      toast({
        title: 'Image deleted successfully',
        variant: 'default',
      });
    },
    onError: (error: Error) => {
      toast({
        title: 'Failed to delete image',
        description: error.message,
        variant: 'destructive',
      });
    },
  });

  const mutateCreateVacancy = useMutation({
    mutationFn: createVacancy,
    onMutate: async (newVacancy) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({ queryKey: ['vacancies'] });

      // Snapshot the previous value
      const previousVacancies = queryClient.getQueryData(['vacancies']);

      // Return a context object with the snapshot
      return { previousVacancies };
    },
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['vacancies'] });
      toast({
        title: 'Vacancy created successfully',
        variant: 'default',
      });
      // Router navigation is now handled in the component for better UX
    },
    onError: (error: Error, variables, context) => {
      // If there was an error, roll back to the previous value
      if (context?.previousVacancies) {
        queryClient.setQueryData(['vacancies'], context.previousVacancies);
      }

      toast({
        title: 'Failed to create vacancy',
        description: error.message,
        variant: 'destructive',
      });
    },
  });

  const mutateUpdateVacancy = useMutation({
    mutationFn: updateVacancy,
    onMutate: async ({ data, vacancyId }) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({ queryKey: ['vacancies'] });
      await queryClient.cancelQueries({ queryKey: ['vacancy', vacancyId] });

      // Snapshot the previous values
      const previousVacancies = queryClient.getQueryData(['vacancies']);
      const previousVacancy = queryClient.getQueryData(['vacancy', vacancyId]);

      // Optimistically update the cache
      if (previousVacancy) {
        queryClient.setQueryData(['vacancy', vacancyId], {
          ...previousVacancy,
          ...data,
        });
      }

      // Return a context with the snapshot
      return { previousVacancies, previousVacancy };
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['vacancies'] });
      queryClient.invalidateQueries({ queryKey: ['vacancy', data.id] });
      toast({
        title: 'Vacancy updated successfully',
        variant: 'default',
      });
      // Router navigation is now handled in the component for better UX
    },
    onError: (error: Error, { vacancyId }, context) => {
      // Roll back to the previous values
      if (context?.previousVacancy) {
        queryClient.setQueryData(
          ['vacancy', vacancyId],
          context.previousVacancy
        );
      }
      if (context?.previousVacancies) {
        queryClient.setQueryData(['vacancies'], context.previousVacancies);
      }

      toast({
        title: 'Failed to update vacancy',
        description: error.message,
        variant: 'destructive',
      });
    },
  });

  const mutateDeleteVacancy = useMutation({
    mutationFn: deleteVacancy,
    onMutate: async ({ vacancyId, countryId }) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({ queryKey: ['vacancies'] });

      // Snapshot the previous value
      const previousVacancies = queryClient.getQueryData(['vacancies']);

      // Optimistically remove from cache
      if (previousVacancies && Array.isArray(previousVacancies)) {
        queryClient.setQueryData(
          ['vacancies'],
          previousVacancies.filter((vacancy: any) => vacancy.id !== vacancyId)
        );
      }

      return { previousVacancies };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['vacancies'] });
      toast({
        title: 'Vacancy deleted successfully',
        variant: 'default',
      });
      // Router navigation is now handled in the component for better UX
    },
    onError: (error: Error, variables, context) => {
      // Roll back to the previous value
      if (context?.previousVacancies) {
        queryClient.setQueryData(['vacancies'], context.previousVacancies);
      }

      toast({
        title: 'Failed to delete vacancy',
        description: error.message,
        variant: 'destructive',
      });
    },
  });

  // Hook to fetch a specific vacancy
  const useVacancy = (vacancyId?: string, countryId?: string) => {
    return useQuery({
      queryKey: ['vacancy', vacancyId],
      queryFn: () => fetchVacancy(vacancyId!, countryId!),
      enabled: !!vacancyId && !!countryId,
    });
  };

  return {
    mutateAsyncDeleteUploadImg,
    mutateCreateVacancy,
    mutateUpdateVacancy,
    mutateDeleteVacancy,
    useVacancy,
  };
};
