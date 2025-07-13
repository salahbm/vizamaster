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
  useCreateVacancy,
  vacancyFormSchema,
  VacancyFormValues,
} from '@/hooks/admin/useVacancy';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useState, useEffect } from 'react';
import FileUpload from '@/components/shared/file-upload';
import Image from 'next/image';
import {
  AlertCircle,
  ArrowLeft,
  CheckCircle2,
  Globe,
  ImageIcon,
  Loader2,
  PlusCircle,
  Trash,
  Trash2Icon,
} from 'lucide-react';
import { Job } from '@prisma/client';
import ConfirmModal from '@/components/shared/modals/confirm-modal';
import dayjs from 'dayjs';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { useRouter } from 'next/navigation';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

const UpdateVacancyForm = ({
  vacancy,
  vacancyId,
}: {
  vacancy: Job;
  vacancyId: string;
}) => {
  const router = useRouter();
  const {
    mutateUpdateVacancy,
    mutateAsyncDeleteUploadImg,
    mutateDeleteVacancy,
  } = useCreateVacancy();

  // Success state management
  const [showSuccess, setShowSuccess] = useState(false);
  const [isRedirecting, setIsRedirecting] = useState(false);

  // Form state with improved validation mode
  const form = useForm<VacancyFormValues>({
    resolver: zodResolver(vacancyFormSchema),
    mode: 'onChange',
    defaultValues: {
      name: vacancy.name,
      title: vacancy.title || '',
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

  const { isSubmitting, isValid, isDirty, errors } = form.formState;

  // Image editing state
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const toggleEdit = () => setIsEditing((prev) => !prev);

  // Handle image deletion with loading state
  const handleDeleteImg = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      setIsDeleting(true);
      await mutateAsyncDeleteUploadImg.mutateAsync(
        form.getValues('imgUrl') as string
      );
      form.setValue('imgUrl', '');
      form.trigger('imgUrl');
      toggleEdit();
    } catch (error) {
      console.error('Failed to delete image:', error);
    } finally {
      setIsDeleting(false);
    }
  };

  // Handle form submission with success feedback
  const onSubmit = async (values: VacancyFormValues) => {
    try {
      await mutateUpdateVacancy.mutateAsync({ data: values, vacancyId });
      setShowSuccess(true);

      // Auto-redirect after successful update
      setTimeout(() => {
        setIsRedirecting(true);
        router.push('/posts');
      }, 2000);
    } catch (error) {
      console.error('Failed to update vacancy:', error);
    }
  };

  // Handle vacancy deletion
  const onDelete = async () => {
    try {
      await mutateDeleteVacancy.mutateAsync({
        vacancyId: vacancyId,
        countryId: vacancy.countryId,
      });
      // Deletion is handled by the mutation's onSuccess callback
    } catch (error) {
      console.error('Failed to delete vacancy:', error);
    }
  };

  return (
    <div className="py-6">
      {/* Success message with auto-redirect */}
      {showSuccess && (
        <Alert variant="default" className="mb-6 bg-green-50 border-green-200">
          <CheckCircle2 className="h-5 w-5 text-green-600" />
          <AlertTitle className="text-green-800">
            Vacancy Updated Successfully
          </AlertTitle>
          <AlertDescription className="text-green-700">
            {isRedirecting ? (
              <div className="flex items-center gap-2">
                <span>Redirecting to vacancies list</span>
                <Loader2 className="h-4 w-4 animate-spin" />
              </div>
            ) : (
              "Your vacancy has been updated. You'll be redirected to the vacancies list."
            )}
          </AlertDescription>
        </Alert>
      )}

      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.push('/posts')}
            className="rounded-full"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-3xl font-bold tracking-tight">Update Vacancy</h1>
        </div>
        <div className="text-sm text-muted-foreground">
          Last Updated: {dayjs(vacancy?.updatedAt).format('DD-MM-YYYY')}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Vacancy Details</CardTitle>
              <CardDescription>
                Update the job vacancy information and settings.
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
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Vacancy Name*</FormLabel>
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
                    <FormField
                      control={form.control}
                      name="title"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Title</FormLabel>
                          <FormControl>
                            <Input
                              disabled={isSubmitting}
                              placeholder="Write an engaging title"
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
                    name="imgUrl"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex justify-between items-center">
                          Featured Image
                          {field.value ? (
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={handleDeleteImg}
                                    disabled={isDeleting}
                                  >
                                    {isDeleting ? (
                                      <Loader2 className="h-4 w-4 animate-spin text-primary" />
                                    ) : (
                                      <Trash2Icon className="h-4 w-4 text-primary" />
                                    )}
                                  </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>Remove image</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          ) : (
                            !isEditing && (
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={toggleEdit}
                              >
                                <PlusCircle className="h-4 w-4" />
                              </Button>
                            )
                          )}
                        </FormLabel>

                        <FormControl>
                          {field.value ? (
                            <div className="relative aspect-video mt-2 rounded-md overflow-hidden border border-border">
                              <Image
                                fill
                                alt="Vacancy featured image"
                                src={field.value}
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
                                    form.trigger('imgUrl');
                                    toggleEdit();
                                  }
                                }}
                              />
                              <div className="text-xs text-muted-foreground mt-2">
                                16:9 aspect ratio recommended for best display
                              </div>
                            </div>
                          ) : (
                            <div className="flex flex-col items-center justify-center h-40 bg-muted rounded-md border border-dashed border-border">
                              <ImageIcon className="h-10 w-10 text-muted-foreground mb-2" />
                              <p className="text-sm text-muted-foreground">
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
                        <FormLabel>Description*</FormLabel>
                        <FormControl>
                          <Editor {...field} />
                        </FormControl>
                        <FormDescription>
                          Provide detailed information about the job
                          responsibilities, requirements, and benefits.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                    <Card className="border-muted">
                      <CardHeader className="pb-3">
                        <CardTitle className="text-base">
                          Visibility Options
                        </CardTitle>
                        <CardDescription>
                          Control how this vacancy appears to users
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4 pt-0">
                        <FormField
                          control={form.control}
                          name="isActive"
                          render={({ field }) => (
                            <FormItem className="flex justify-between items-center space-y-0">
                              <div>
                                <FormLabel>Active</FormLabel>
                                <FormDescription className="text-xs">
                                  Show this vacancy on the website
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
                            <FormItem className="flex justify-between items-center space-y-0">
                              <div>
                                <FormLabel>Deadline</FormLabel>
                                <FormDescription className="text-xs">
                                  Mark as having an application deadline
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
                      </CardContent>
                    </Card>

                    <Card className="border-muted">
                      <CardHeader className="pb-3">
                        <CardTitle className="text-base">
                          Promotion Options
                        </CardTitle>
                        <CardDescription>
                          Control how this vacancy is promoted
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4 pt-0">
                        <FormField
                          control={form.control}
                          name="isNew"
                          render={({ field }) => (
                            <FormItem className="flex justify-between items-center space-y-0">
                              <div>
                                <FormLabel>New</FormLabel>
                                <FormDescription className="text-xs">
                                  Mark as a new vacancy
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
                            <FormItem className="flex justify-between items-center space-y-0">
                              <div>
                                <FormLabel>Trending</FormLabel>
                                <FormDescription className="text-xs">
                                  Feature as a trending vacancy
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
                      </CardContent>
                    </Card>
                  </div>

                  <div className="flex items-center justify-between pt-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => router.push('/posts')}
                    >
                      Cancel
                    </Button>
                    <div className="flex items-center gap-2">
                      <ConfirmModal onConfirm={onDelete}>
                        <Button
                          type="button"
                          variant="destructive"
                          size="sm"
                          disabled={
                            mutateDeleteVacancy.isPending || isSubmitting
                          }
                        >
                          {mutateDeleteVacancy.isPending ? (
                            <Loader2 className="h-4 w-4 animate-spin mr-2" />
                          ) : (
                            <Trash className="h-4 w-4 mr-2" />
                          )}
                          Delete
                        </Button>
                      </ConfirmModal>
                      <Button
                        disabled={
                          !isValid ||
                          !isDirty ||
                          isSubmitting ||
                          mutateAsyncDeleteUploadImg.isPending
                        }
                        type="submit"
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="h-4 w-4 animate-spin mr-2" />
                            Updating...
                          </>
                        ) : (
                          'Update Vacancy'
                        )}
                      </Button>
                    </div>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5" />
                Country Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium">Country</h3>
                  <p className="text-sm text-muted-foreground">
                    {vacancy.countryName}
                  </p>
                </div>

                {Object.keys(errors).length > 0 && (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Form Errors</AlertTitle>
                    <AlertDescription>
                      Please fix the errors in the form before submitting.
                    </AlertDescription>
                  </Alert>
                )}

                <div className="pt-4">
                  <h3 className="font-medium mb-2">Guidelines</h3>
                  <ul className="text-sm text-muted-foreground space-y-2">
                    <li>• Use clear and specific job titles</li>
                    <li>• Include key responsibilities and requirements</li>
                    <li>• Specify any special skills or qualifications</li>
                    <li>• Mention benefits and perks</li>
                    <li>• Set appropriate visibility options</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default UpdateVacancyForm;
