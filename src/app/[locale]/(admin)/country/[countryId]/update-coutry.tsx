'use client';
import * as z from 'zod';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormLabel,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { formSchema, useUpdateCountry } from '@/hooks/admin/useCountry';
import { Editor } from '@/components/shared/editor';
import { Country } from '@prisma/client';

const UpdateCountryForm = ({
  initialData,
  countryId,
}: {
  initialData: Country;
  countryId: string;
}) => {
  const { mutateAsync: updateCountry, isPending } = useUpdateCountry();

  if (!initialData || !countryId) {
    return null;
  }

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      emoji: initialData?.emoji || '',
      name: initialData?.name || '',
      description: initialData?.description || '',
      title: initialData?.title || '',
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    await updateCountry({ data: values, countryId });
  };

  return (
    <div className="flex justify-center h-full p-6">
      <div>
        <h1 className="textGradient text-2xl">Name the country</h1>

        <p className="text-sm text-slate-600">
          This section will help you name the country and its related data.
        </p>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 mt-8"
          >
            <FormField
              control={form.control}
              name="emoji"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Country Emoji</FormLabel>

                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      placeholder={`e.g. "🇺🇿" `}
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Country Name</FormLabel>

                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      placeholder={`e.g. "Uzbekistan" `}
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>

                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      placeholder={`Write some interesting title`}
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Editor {...field} />
                  </FormControl>
                  <FormDescription>
                    Write about what vacancies this country offers in the
                    description
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex items-center gap-x-2">
              <Button
                disabled={!isValid || isSubmitting || isPending}
                type="submit"
                className="text-white"
              >
                Update
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default UpdateCountryForm;
