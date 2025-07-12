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
import {
  AlertTriangle,
  ArrowLeft,
  Calendar,
  Loader2,
  Save,
  Trash,
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Switch } from '@/components/ui/switch';
import dayjs from 'dayjs';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { useState } from 'react';

const UpdateCountryForm = ({
  initialData,
  countryId,
}: {
  initialData: Country;
  countryId: string;
}) => {
  const { mutateAsync: updateCountry, isPending } = useUpdateCountry();
  const { mutateAsync: deleteCountry, isPending: isPendingDelete } =
    useDeleteCountry();
  const router = useRouter();
  const [isEdited, setIsEdited] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      emoji: initialData?.emoji || '',
      name: initialData?.name || '',
      description: initialData?.description || '',
      title: initialData?.title || '',
      isNew: initialData?.isNew || false,
    },
    mode: 'onChange',
  });

  if (!initialData || !countryId) {
    return (
      <Alert variant="destructive">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          Country not found. Please check the country ID and try again.
        </AlertDescription>
      </Alert>
    );
  }

  const { isSubmitting, isValid, isDirty } = form.formState;

  // Track form changes to show edited status
  form.watch(() => {
    if (!isEdited && isDirty) {
      setIsEdited(true);
    }
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await updateCountry({ data: values, countryId });
      setIsEdited(false);
    } catch (error) {
      console.error('Error updating country:', error);
    }
  };

  const onDelete = async () => {
    try {
      await deleteCountry(countryId);
    } catch (error) {
      console.error('Error deleting country:', error);
    }
  };

  return (
    <div className="container max-w-5xl mx-auto py-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.back()}
            className="rounded-full"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              {initialData.emoji} {initialData.name}
            </h1>
            <p className="text-muted-foreground">
              Update country information and manage vacancies
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {isEdited && (
            <Badge
              variant="outline"
              className="bg-amber-50 text-amber-700 border-amber-200"
            >
              Unsaved Changes
            </Badge>
          )}
          <Badge variant={initialData.isNew ? 'default' : 'outline'}>
            {initialData.isNew ? 'New' : 'Standard'}
          </Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Country Details</CardTitle>
            <CardDescription>
              Update the country information that will be displayed to users
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                id="country-form"
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="emoji"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Country Flag Emoji</FormLabel>
                        <FormControl>
                          <Input
                            disabled={isSubmitting}
                            placeholder="🇺🇿"
                            {...field}
                            className="text-lg"
                          />
                        </FormControl>
                        <FormDescription>
                          Use a country flag emoji (e.g. &quot;🇺🇿&quot;,
                          &quot;🇺🇸&quot;, &quot;🇷🇺&quot;)
                        </FormDescription>
                        <FormMessage />
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
                            placeholder="Uzbekistan"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          The official name of the country
                        </FormDescription>
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
                          placeholder="Work opportunities in Uzbekistan"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        A catchy title for this country&apos;s job opportunities
                      </FormDescription>
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
                        Provide detailed information about job opportunities in
                        this country
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="isNew"
                  render={({ field }) => (
                    <FormItem className="flex items-center justify-between space-y-0 rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">Mark as New</FormLabel>
                        <FormDescription>
                          Highlight this country as newly added on the platform
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
              </form>
            </Form>
          </CardContent>
          <CardFooter className="flex justify-between border-t pt-6">
            <ConfirmModal
              onConfirm={onDelete}
              title="Delete Country"
              description="Are you sure you want to delete this country? This will also remove all associated job vacancies and cannot be undone."
            >
              <Button
                variant="destructive"
                size="sm"
                disabled={isPendingDelete || isSubmitting}
              >
                {isPendingDelete ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Deleting...
                  </>
                ) : (
                  <>
                    <Trash className="mr-2 h-4 w-4" />
                    Delete Country
                  </>
                )}
              </Button>
            </ConfirmModal>

            <Button
              type="submit"
              form="country-form"
              disabled={!isValid || isSubmitting || isPending || !isDirty}
              className="text-white"
            >
              {isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  Save Changes
                </>
              )}
            </Button>
          </CardFooter>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Country Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Created</span>
                <span className="font-medium flex items-center gap-1">
                  <Calendar className="h-3.5 w-3.5" />
                  {dayjs(initialData.createdAt).format('MMM D, YYYY')}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Last Updated</span>
                <span className="font-medium flex items-center gap-1">
                  <Calendar className="h-3.5 w-3.5" />
                  {dayjs(initialData.updatedAt).format('MMM D, YYYY')}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Status</span>
                <Badge variant={initialData.isNew ? 'default' : 'outline'}>
                  {initialData.isNew ? 'New' : 'Standard'}
                </Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">ID</span>
                <span className="font-mono text-xs bg-muted px-2 py-1 rounded">
                  {countryId.substring(0, 8)}...
                </span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Related Vacancies</CardTitle>
              <CardDescription>
                Job opportunities in {initialData.name}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button
                variant="outline"
                className="w-full"
                onClick={() =>
                  router.push(`/vacancies?country=${initialData.name}`)
                }
              >
                View All Vacancies
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default UpdateCountryForm;
