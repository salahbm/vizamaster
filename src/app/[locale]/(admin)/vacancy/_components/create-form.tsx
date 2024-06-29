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
import { useCreateCountry } from '@/hooks/admin/useCountry';
import { Editor } from '@/components/shared/editor';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useCreateVacancy, vacancyFormSchema } from '@/hooks/admin/useVacancy';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { useState } from 'react';
import FileUpload from '@/components/shared/file-upload';
import Image from 'next/image';
import { ImageIcon, Pencil, PlusCircle } from 'lucide-react';

const CreateVacancyForm = ({
  countries,
}: {
  countries: { name: string; id: string; emoji: string }[];
}) => {
  const { mutateAsync: createVacancy, isPending } = useCreateVacancy();

  const form = useForm<z.infer<typeof vacancyFormSchema>>({
    resolver: zodResolver(vacancyFormSchema),
    defaultValues: {
      name: '',
      title: '',
      description: '',
      imgUrl: '',
      countryId: '',
      countryName: '',
      isNew: true,
      isTrend: false,
      isActive: true,
      isDeadline: false,
    },
  });

  console.log('====================================');
  console.log(form.getValues('imgUrl'));
  console.log('====================================');

  const { isSubmitting, isValid } = form.formState;

  const [isEditing, setIsEditing] = useState(false);

  const toggleEdit = () => setIsEditing((prev) => !prev);

  const onSubmit = async (values: z.infer<typeof vacancyFormSchema>) => {
    console.log(`values:`, values);
    // await createVacancy(values);
    toggleEdit();
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
              name="countryName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Country</FormLabel>

                  <FormControl>
                    <Select>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Choose the country" />
                      </SelectTrigger>
                      <SelectContent>
                        {countries.map((country) => (
                          <SelectItem value={country.name} key={country.id}>
                            {country.name} {country.emoji}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="countryName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex justify-between items-center">
                    Image
                    {!isEditing && (
                      <Button variant={'ghost'} onClick={toggleEdit}>
                        <PlusCircle className="h-4 w-4 mr-2" />
                      </Button>
                    )}
                  </FormLabel>

                  <FormControl>
                    {form.getValues('imgUrl') !== '' ? (
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
                          onChange={(url?: string) => {
                            if (url) {
                              form.setValue('imgUrl', url);
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
                disabled={!isValid || isSubmitting || isPending}
                type="submit"
                className="text-white"
              >
                Continue
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default CreateVacancyForm;
