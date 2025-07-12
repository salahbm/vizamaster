import { toast } from '@/components/ui/use-toast';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { z } from 'zod';
import { Country } from '@prisma/client';

// Define a more robust schema with better validation messages
export const formSchema = z.object({
  id: z.string().optional(),
  emoji: z.string().min(1, {
    message: 'Country flag emoji is required',
  }),
  name: z
    .string()
    .min(1, {
      message: 'Country name is required',
    })
    .max(50, {
      message: 'Country name cannot exceed 50 characters',
    }),
  description: z.string().min(10, {
    message: 'Please provide a description of at least 10 characters',
  }),
  title: z
    .string()
    .min(1, {
      message: 'A title is required for better SEO',
    })
    .max(100, {
      message: 'Title cannot exceed 100 characters',
    })
    .optional(),
  isNew: z.boolean().default(false),
});

// Type for API error responses
interface ApiError {
  message: string;
  errors?: Record<string, string[]>;
}

// Helper function to format error messages
const formatErrorMessage = (error: unknown): string => {
  if (error instanceof AxiosError) {
    const apiError = error.response?.data as ApiError;
    if (apiError?.message) return apiError.message;
    if (apiError?.errors) {
      const firstError = Object.values(apiError.errors)[0]?.[0];
      if (firstError) return firstError;
    }
  }
  return 'An unexpected error occurred';
};

// Create country function
export const createCountry = async (data: z.infer<typeof formSchema>) => {
  try {
    const response = await axios.post('/api/country', data);
    return response.data;
  } catch (error) {
    throw new Error(formatErrorMessage(error));
  }
};

export const useCreateCountry = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: createCountry,
    onSuccess(data) {
      // Optimistically update the countries list
      queryClient.setQueryData(
        ['countries'],
        (oldData: Country[] | undefined) => {
          return oldData ? [...oldData, data] : [data];
        }
      );

      // Also invalidate to ensure data consistency
      queryClient.invalidateQueries({ queryKey: ['countries'] });

      toast({
        title: 'Success!',
        description: `${data.name} has been added successfully.`,
        variant: 'default',
      });

      router.push(`/jobs`);
    },
    onError(error) {
      toast({
        title: 'Failed to create country',
        description: formatErrorMessage(error),
        variant: 'destructive',
      });
    },
  });
};

// Fetch a single country
export const fetchCountry = async (countryId: string): Promise<Country> => {
  if (!countryId) throw new Error('Country ID is required');

  const response = await axios.get(`/api/country/${countryId}`);
  return response.data;
};

export const useCountry = (countryId: string) => {
  return useQuery({
    queryKey: ['country', countryId],
    queryFn: () => fetchCountry(countryId),
    enabled: !!countryId,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};

// Update country function
export const updateCountry = async ({
  data,
  countryId,
}: {
  data: z.infer<typeof formSchema>;
  countryId: string;
}) => {
  if (!countryId) {
    throw new Error('Country ID is required for updating');
  }

  try {
    const response = await axios.patch(`/api/country/${countryId}`, data);
    return response.data;
  } catch (error) {
    throw new Error(formatErrorMessage(error));
  }
};

export const useUpdateCountry = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: updateCountry,
    onMutate: async ({ data, countryId }) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({ queryKey: ['country', countryId] });
      await queryClient.cancelQueries({ queryKey: ['countries'] });

      // Snapshot the previous value
      const previousCountry = queryClient.getQueryData(['country', countryId]);

      // Optimistically update the country
      queryClient.setQueryData(
        ['country', countryId],
        (old: Country | undefined) => {
          return { ...old, ...data };
        }
      );

      // Return context with the snapshotted value
      return { previousCountry, countryId };
    },
    onSuccess(data) {
      queryClient.invalidateQueries({ queryKey: ['countries'] });
      queryClient.invalidateQueries({ queryKey: ['country', data.id] });

      toast({
        title: 'Country updated',
        description: `${data.name} has been updated successfully.`,
      });
    },
    onError(error, variables, context) {
      // Rollback to the previous value if available
      if (context?.previousCountry && context.countryId) {
        queryClient.setQueryData(
          ['country', context.countryId],
          context.previousCountry
        );
      }

      toast({
        title: 'Update failed',
        description: formatErrorMessage(error),
        variant: 'destructive',
      });
    },
  });
};

// Delete country function
export const deleteCountry = async (countryId: string) => {
  if (!countryId) {
    throw new Error('Country ID is required for deleting');
  }

  try {
    const response = await axios.delete(`/api/country/${countryId}`);
    return response.data;
  } catch (error) {
    throw new Error(formatErrorMessage(error));
  }
};

export const useDeleteCountry = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: deleteCountry,
    onMutate: async (countryId) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({ queryKey: ['countries'] });

      // Snapshot the previous countries
      const previousCountries = queryClient.getQueryData(['countries']);

      // Optimistically remove the country from the list
      queryClient.setQueryData(['countries'], (old: Country[] | undefined) => {
        return old ? old.filter((country) => country.id !== countryId) : [];
      });

      return { previousCountries };
    },
    onSuccess(_, countryId) {
      // Remove from cache
      queryClient.removeQueries({ queryKey: ['country', countryId] });
      queryClient.invalidateQueries({ queryKey: ['countries'] });

      toast({
        title: 'Country deleted',
        description: 'The country and all its vacancies have been removed.',
      });

      router.push(`/countries`);
    },
    onError(error, countryId, context) {
      // Rollback to the previous countries list
      if (context?.previousCountries) {
        queryClient.setQueryData(['countries'], context.previousCountries);
      }

      toast({
        title: 'Failed to delete',
        description: formatErrorMessage(error),
        variant: 'destructive',
      });
    },
  });
};

// Fetch all countries
export const fetchCountries = async (): Promise<Country[]> => {
  const response = await axios.get('/api/country');
  return response.data;
};

export const useCountries = () => {
  return useQuery({
    queryKey: ['countries'],
    queryFn: fetchCountries,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};
