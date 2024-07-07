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
import {
  formSchema,
  useDeleteCountry,
  useUpdateCountry,
} from '@/hooks/admin/useCountry';
import { Editor } from '@/components/shared/editor';
import { Country } from '@prisma/client';
import ConfirmModal from '@/components/shared/modals/confirm-modal';
import { Trash } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import dayjs from 'dayjs';

const UpdateCountryForm = ({
  initialData,
  countryId,
}: {
  initialData: Country;
  countryId: string;
}) => {
  const { mutateAsync: updateCountry, isPending } = useUpdateCountry();

  const { mutateAsync: mutateAsyncDeleteCourse, isPending: isPendingDelete } =
    useDeleteCountry();

  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      emoji: initialData?.emoji || '',
      name: initialData?.name || '',
      description: initialData?.description || '',
      title: initialData?.title || '',
      isNew: initialData?.isNew!!,
    },
  });

  if (!initialData || !countryId) {
    return <p>Country not found</p>;
  }

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    await updateCountry({ data: values, countryId });
  };

  // delete country

  const onDelete = async () => {
    await mutateAsyncDeleteCourse(countryId);
    router.push(`/posts`);
  };
  return (
    <div className="flex justify-center h-full p-6">
      <div>
        <div>
          <h1 className="textGradient text-2xl">Update the country</h1>

          <p className="text-sm text-slate-600">
            Update the country information here and click on update button.
          </p>
        </div>
        <div className="flex items-center justify-between flex-wrap gap-y-2">
          <Separator className="my-2" />
          <div className="flex sm:flex-row sm:items-center sm:justify-between flex-col items-start w-full gap-2">
            <div className="text-sm md:text-lg  text-neutral-700">
              Last Updated: {dayjs(initialData?.updatedAt).format('DD-MM-YYYY')}
            </div>
            <ConfirmModal onConfirm={onDelete}>
              <Button size={'sm'} disabled={isPendingDelete || isSubmitting}>
                <Trash className="w-4 h-4 text-white" />
              </Button>
            </ConfirmModal>
          </div>
        </div>

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

            <FormField
              control={form.control}
              name="isNew"
              render={({ field }) => (
                <FormItem className=" justify-between flex items-center">
                  <FormLabel>Is New?</FormLabel>
                  <FormControl>
                    <Switch
                      disabled={isSubmitting}
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      className=" mt-2"
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <Separator className="my-6" />

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
