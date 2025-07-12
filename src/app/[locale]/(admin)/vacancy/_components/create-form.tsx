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
import { useCallback, useEffect, useState } from 'react';
import FileUpload from '@/components/shared/file-upload';
import Image from 'next/image';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
  ArrowLeft,
  CheckCircle2,
  ImageIcon,
  Loader2,
  PlusCircle,
  Trash2Icon,
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

interface Country {
  name: string;
  id: string;
  emoji: string;
}

interface CreateVacancyFormProps {
  countries: Country[];
}

const CreateVacancyForm = ({ countries }: CreateVacancyFormProps) => {
  const router = useRouter();
  const { mutateCreateVacancy, mutateAsyncDeleteUploadImg } =
    useCreateVacancy();
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const form = useForm<z.infer<typeof vacancyFormSchema>>({
    resolver: zodResolver(vacancyFormSchema),
    mode: 'onChange',
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

  const { isSubmitting, isValid, isDirty } = form.formState;
  const [isEditing, setIsEditing] = useState(false);

  const toggleEdit = () => setIsEditing((prev) => !prev);

  const handleDeleteImg = async () => {
    const imgUrl = form.getValues('imgUrl');
    if (!imgUrl) return;

    try {
      await mutateAsyncDeleteUploadImg.mutateAsync(imgUrl);
      form.setValue('imgUrl', '');
      form.trigger('imgUrl');
    } catch (error) {
      console.error('Failed to delete image:', error);
    } finally {
      toggleEdit();
    }
  };

  const onSubmit = async (values: z.infer<typeof vacancyFormSchema>) => {
    try {
      await mutateCreateVacancy.mutateAsync(values, {
        onSuccess: () => {
          setShowSuccessMessage(true);
          setTimeout(() => {
            router.push('/posts');
          }, 2000);
        },
      });
    } catch (error) {
      console.error('Failed to create vacancy:', error);
    }
  };

  const handleCountryChange = useCallback(
    (countryName: string) => {
      form.setValue('countryName', countryName);

      const country = countries.find((c) => c.name === countryName);
      if (country) {
        form.setValue('countryId', country.id);
        form.trigger('countryId');
      }
    },
    [form, countries]
  );

  // Monitor countryName changes
  useEffect(() => {
    const subscription = form.watch((value, { name }) => {
      if (name === 'countryName') {
        const countryName = value.countryName as string;
        if (countryName) {
          const country = countries.find((c) => c.name === countryName);
          if (country) {
            form.setValue('countryId', country.id);
            form.trigger('countryId');
          }
        }
      }
    });

    return () => subscription.unsubscribe();
  }, [form, countries]);

  if (showSuccessMessage) {
    return (
      <Alert className="bg-green-50 border-green-200 text-green-800 my-8">
        <CheckCircle2 className="h-5 w-5 text-green-600" />
        <AlertDescription className="flex items-center gap-2">
          <span>Vacancy created successfully! Redirecting...</span>
          <Loader2 className="h-4 w-4 animate-spin text-green-600" />
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="container max-w-5xl mx-auto py-6">
      <Button variant="ghost" onClick={() => router.back()} className="mb-6">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to vacancies
      </Button>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-bold">
                Create New Vacancy
              </CardTitle>
              <CardDescription>
                Fill in the details to create a new job vacancy
              </CardDescription>
            </CardHeader>

            <CardContent>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-6"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="countryName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Country</FormLabel>
                          <FormControl>
                            <Select
                              onValueChange={(value) =>
                                handleCountryChange(value)
                              }
                              value={field.value}
                              disabled={isSubmitting}
                            >
                              <SelectTrigger className="w-full">
                                <SelectValue placeholder="Choose the country" />
                              </SelectTrigger>
                              <SelectContent>
                                {countries.map((country) => (
                                  <SelectItem
                                    value={country.name}
                                    key={country.id}
                                  >
                                    {country.emoji} {country.name}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <FormMessage />
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
                              placeholder="e.g. Restaurant Chef Assistant"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Title</FormLabel>
                        <FormControl>
                          <Input
                            disabled={isSubmitting}
                            placeholder="Write an attention-grabbing title"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          A short, compelling title to attract applicants
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="imgUrl"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex justify-between items-center">
                          Featured Image
                          {field.value ? (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={handleDeleteImg}
                              type="button"
                              disabled={mutateAsyncDeleteUploadImg.isPending}
                            >
                              {mutateAsyncDeleteUploadImg.isPending ? (
                                <Loader2 className="h-4 w-4 animate-spin" />
                              ) : (
                                <Trash2Icon className="h-4 w-4 text-destructive" />
                              )}
                              <span className="ml-2">Remove</span>
                            </Button>
                          ) : (
                            !isEditing && (
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={toggleEdit}
                                type="button"
                              >
                                <PlusCircle className="h-4 w-4 mr-2" />
                                Add Image
                              </Button>
                            )
                          )}
                        </FormLabel>

                        <FormControl>
                          {field.value ? (
                            <div className="relative aspect-video mt-2 rounded-md overflow-hidden border border-input">
                              <Image
                                fill
                                alt="Vacancy featured image"
                                src={field.value}
                                className="object-cover"
                              />
                            </div>
                          ) : isEditing ? (
                            <div>
                              <FileUpload
                                endpoint="courseImage"
                                onChange={(url) => {
                                  if (url) {
                                    form.setValue('imgUrl', url);
                                    form.trigger('imgUrl');
                                    toggleEdit();
                                  }
                                }}
                              />
                              <div className="text-xs text-muted-foreground mt-4">
                                16:9 aspect ratio recommended
                              </div>
                            </div>
                          ) : (
                            <div className="flex flex-col items-center justify-center h-48 bg-muted rounded-md border border-dashed border-muted-foreground/25">
                              <ImageIcon className="h-10 w-10 text-muted-foreground/50" />
                              <p className="text-sm text-muted-foreground mt-2">
                                No image uploaded
                              </p>
                            </div>
                          )}
                        </FormControl>
                        <FormMessage />
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
                          Provide detailed information about the job
                          responsibilities, requirements, and benefits
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Separator />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h3 className="text-sm font-medium">Vacancy Status</h3>
                      <div className="space-y-2">
                        <FormField
                          control={form.control}
                          name="isActive"
                          render={({ field }) => (
                            <FormItem className="flex items-center justify-between space-y-0 rounded-md border p-3">
                              <div>
                                <FormLabel className="text-sm font-medium">
                                  Active
                                </FormLabel>
                                <FormDescription className="text-xs text-muted-foreground">
                                  Make this vacancy visible to applicants
                                </FormDescription>
                              </div>
                              <FormControl>
                                <Switch
                                  disabled={isSubmitting}
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="isDeadline"
                          render={({ field }) => (
                            <FormItem className="flex items-center justify-between space-y-0 rounded-md border p-3">
                              <div>
                                <FormLabel className="text-sm font-medium">
                                  Deadline
                                </FormLabel>
                                <FormDescription className="text-xs text-muted-foreground">
                                  Mark this vacancy as having an application
                                  deadline
                                </FormDescription>
                              </div>
                              <FormControl>
                                <Switch
                                  disabled={isSubmitting}
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-sm font-medium">Promotion Options</h3>
                      <div className="space-y-2">
                        <FormField
                          control={form.control}
                          name="isNew"
                          render={({ field }) => (
                            <FormItem className="flex items-center justify-between space-y-0 rounded-md border p-3">
                              <div>
                                <FormLabel className="text-sm font-medium">
                                  New
                                </FormLabel>
                                <FormDescription className="text-xs text-muted-foreground">
                                  Highlight this as a new vacancy
                                </FormDescription>
                              </div>
                              <FormControl>
                                <Switch
                                  disabled={isSubmitting}
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="isTrend"
                          render={({ field }) => (
                            <FormItem className="flex items-center justify-between space-y-0 rounded-md border p-3">
                              <div>
                                <FormLabel className="text-sm font-medium">
                                  Trending
                                </FormLabel>
                                <FormDescription className="text-xs text-muted-foreground">
                                  Feature this vacancy as trending
                                </FormDescription>
                              </div>
                              <FormControl>
                                <Switch
                                  disabled={isSubmitting}
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                  </div>

                  <CardFooter className="px-0 pt-6 flex justify-between">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => router.back()}
                    >
                      Cancel
                    </Button>
                    <Button
                      disabled={
                        !isValid ||
                        !isDirty ||
                        isSubmitting ||
                        mutateCreateVacancy.isPending ||
                        mutateAsyncDeleteUploadImg.isPending
                      }
                      type="submit"
                    >
                      {mutateCreateVacancy.isPending ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Creating...
                        </>
                      ) : (
                        'Create Vacancy'
                      )}
                    </Button>
                  </CardFooter>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Guidelines</CardTitle>
              <CardDescription>
                Tips for creating an effective job vacancy
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 text-sm">
              <div>
                <h4 className="font-medium">Choose the right country</h4>
                <p className="text-muted-foreground">
                  Select the country where this job is located
                </p>
              </div>
              <div>
                <h4 className="font-medium">Write a clear job title</h4>
                <p className="text-muted-foreground">
                  Use specific job titles that candidates are searching for
                </p>
              </div>
              <div>
                <h4 className="font-medium">Add a compelling description</h4>
                <p className="text-muted-foreground">
                  Include responsibilities, requirements, benefits, and
                  application process
                </p>
              </div>
              <div>
                <h4 className="font-medium">Use promotion options wisely</h4>
                <p className="text-muted-foreground">
                  Mark as &quot;New&quot; for recently added positions and
                  &quot;Trending&quot; for popular roles
                </p>
              </div>
              <div>
                <h4 className="font-medium">Add an attractive image</h4>
                <p className="text-muted-foreground">
                  Images related to the job or workplace can increase engagement
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CreateVacancyForm;
