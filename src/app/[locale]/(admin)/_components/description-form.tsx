'use client';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Pencil } from 'lucide-react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Editor } from '@/components/shared/editor';
import { Preview } from '@/components/shared/preview';
// import useUpdateCourse from '@/app/hooks/course/useUpdateCourse';
// import { DescriptionFormProps } from '@/types/course';

const formSchema = z.object({
  description: z.string().min(1, {
    message: 'Description is required',
  }),
});

const DescriptionForm = () => {
  //   const { mutateAsync: updateCourse } = useUpdateCourse();
  const [isEditing, setIsEditing] = useState(false);

  const toggleEdit = () => setIsEditing((prev) => !prev);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      description: '',
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    // await updateCourse({ values, courseId });
    toggleEdit();
  };

  return (
    <div className="mt-6 border bg-slate-50 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Description
        <Button variant={'ghost'} onClick={toggleEdit}>
          {isEditing ? (
            <>Cancel</>
          ) : (
            <>
              <Pencil className="h-4 w-4 mr-2" />
            </>
          )}
        </Button>
      </div>

      {/* {!isEditing && (
        <p
          className={cn(
            'text-sm mt-2',
            !initialData.description && 'text-slate-500 italic'
          )}
        >
          {!initialData.description && 'No description'}

          {initialData.description && (
            <Preview value={initialData.description} />
          )}
        </p>
      )} */}

      {isEditing && (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 mt-4"
          >
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Editor {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex items-center gap-x-2">
              <Button disabled={!isValid || isSubmitting} type="submit">
                Save
              </Button>
            </div>
          </form>
        </Form>
      )}
    </div>
  );
};

export default DescriptionForm;
