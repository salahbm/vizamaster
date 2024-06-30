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
import { Editor } from '@/components/shared/editor';
import { useCreateVacancy, vacancyFormSchema } from '@/hooks/admin/useVacancy';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { useState } from 'react';
import FileUpload from '@/components/shared/file-upload';
import Image from 'next/image';
import { ImageIcon, PlusCircle, Trash, Trash2Icon } from 'lucide-react';
import { Job } from '@prisma/client';
import ConfirmModal from '@/components/shared/modals/confirm-modal';
import dayjs from 'dayjs';

const UpdateVacancyForm = ({
  vacancy,
  vacancyId,
}: {
  vacancy: Job;
  vacancyId: string;
}) => {
  const {
    mutateUpdateVacancy,
    mutateAsyncDeleteUploadImg,
    mutateDeleteVacancy,
  } = useCreateVacancy();

  const form = useForm<z.infer<typeof vacancyFormSchema>>({
    resolver: zodResolver(vacancyFormSchema),
    defaultValues: {
      name: vacancy.name,
      title: vacancy.title || 'No title',
      description: vacancy.description,
      imgUrl: vacancy.imgUrl || '',
      countryId: vacancy.countryId,
      countryName: vacancy.countryName,
      isNew: vacancy.isNew,
      isTrend: vacancy.isTrend,
      isActive: vacancy.isActive,
      isDeadline: vacancy.isDeadline,
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const [isEditing, setIsEditing] = useState(false);

  const toggleEdit = () => setIsEditing((prev) => !prev);

  const handleDeleteImg = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    await mutateAsyncDeleteUploadImg.mutateAsync(
      form.getValues('imgUrl') as string
    );
    toggleEdit();
    form.setValue('imgUrl', '');
    form.trigger('imgUrl');
  };

  const onSubmit = async (values: z.infer<typeof vacancyFormSchema>) => {
    await mutateUpdateVacancy.mutateAsync({ data: values, vacancyId });
    toggleEdit();
  };

  const onDelete = async () => {
    await mutateDeleteVacancy.mutateAsync({
      vacancyId: vacancyId,
      countryId: vacancy.countryId,
    });
  };

  return (
    <div className="flex justify-center h-full p-6">
      <div>
        <h1 className="textGradient text-2xl">Name the Job</h1>

        <p className="text-sm text-slate-600">
          This section will help you name the country and its related data.
        </p>
        <div className="flex items-center justify-between flex-wrap gap-y-2">
          <Separator className="my-2" />
          <div className="flex sm:flex-row sm:items-center sm:justify-between flex-col items-start w-full gap-2">
            <div className="text-sm md:text-lg  text-neutral-700">
              Last Updated: {dayjs(vacancy?.updatedAt).format('DD-MM-YYYY')}
            </div>
            <ConfirmModal onConfirm={onDelete}>
              <Button
                size={'sm'}
                disabled={mutateDeleteVacancy.isPending || isSubmitting}
              >
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
              name="countryName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex justify-between items-center">
                    Image
                    {form.getValues('imgUrl') ? (
                      <Button variant="ghost" onClick={handleDeleteImg}>
                        <Trash2Icon className="h-4 w-4  text-primary" />
                      </Button>
                    ) : (
                      !isEditing && (
                        <Button variant="ghost" onClick={toggleEdit}>
                          <PlusCircle className="h-4 w-4 " />
                        </Button>
                      )
                    )}
                  </FormLabel>

                  <FormControl>
                    {form.getValues('imgUrl') ? (
                      <div className="relative aspect-video mt-2">
                        <Image
                          fill
                          alt="Upload"
                          src={form.getValues('imgUrl') as string}
                          className="object-cover rounded-md"
                        />
                      </div>
                    ) : isEditing ? (
                      <div>
                        <FileUpload
                          endpoint="courseImage"
                          onChange={(url) => {
                            if (url) {
                              form.setValue('imgUrl', url);
                              form.trigger('imgUrl'); // Automatically trigger validation
                            }
                          }}
                        />
                        <div className="text-xs text-muted-foreground mt-4">
                          16:9 aspect ratio recommended
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center h-60 bg-slate-100 rounded-md">
                        <ImageIcon className="h-10 w-10 text-slate-400" />
                      </div>
                    )}
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Vacancy Name</FormLabel>

                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      placeholder={`e.g. "Restaurant Chef Assistant" `}
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

            <div className="grid grid-cols-2 items-center gap-x-2">
              <FormField
                control={form.control}
                name="isNew"
                render={({ field }) => (
                  <FormItem className=" justify-between flex items-center">
                    <FormLabel> New</FormLabel>
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
              <FormField
                control={form.control}
                name="isActive"
                render={({ field }) => (
                  <FormItem className=" justify-between flex items-center">
                    <FormLabel>Active</FormLabel>
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
              <FormField
                control={form.control}
                name="isDeadline"
                render={({ field }) => (
                  <FormItem className=" justify-between flex items-center">
                    <FormLabel>Deadline</FormLabel>
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
              <FormField
                control={form.control}
                name="isTrend"
                render={({ field }) => (
                  <FormItem className=" justify-between flex items-center">
                    <FormLabel>Trending</FormLabel>
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
            </div>
            <Separator className="my-6" />

            <div className="flex items-center gap-x-2">
              <Button
                disabled={
                  !isValid ||
                  isSubmitting ||
                  mutateAsyncDeleteUploadImg.isPending
                }
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

export default UpdateVacancyForm;
