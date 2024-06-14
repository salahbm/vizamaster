'use client';

import * as z from 'zod';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import Link from 'next/link';
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
import { formSchema } from '@/hooks/admin/use-create-country';

const CreatePage = () => {
  //   const { mutate } = useCreateCourse();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    // mutate(values);
    console.log(values);
  };

  return (
    <div className="max-w-5xl mx-auto flex md:items-center md:justify-center h-full p-6">
      <div>
        <h1 className="text-2xl">Name your course</h1>

        <p className="text-sm text-slate-600">
          {`What would you like to name your course? Don't worry, you can change
    this later.`}
        </p>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 mt-8"
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Course title</FormLabel>

                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      placeholder={`e.g. "Advance web development"`}
                      {...field}
                    />
                  </FormControl>

                  <FormDescription>
                    What will you teach in this course?
                  </FormDescription>

                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex items-center gap-x-2">
              <Link href="/">
                <Button type="button" variant="ghost">
                  Cancel
                </Button>
              </Link>

              <Button type="submit">Continue</Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default CreatePage;
