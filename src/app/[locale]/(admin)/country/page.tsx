'use client';

import * as z from 'zod';
import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { ArrowLeft, CheckCircle, Globe, Info, Loader2 } from 'lucide-react';

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
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { formSchema, useCreateCountry } from '@/hooks/admin/useCountry';

type FormValues = z.infer<typeof formSchema>;

const CreateCountryPage = () => {
  const router = useRouter();
  const {
    mutate: createCountry,
    isPending,
    isSuccess,
    isError,
    error,
  } = useCreateCountry();
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      emoji: '',
      name: '',
      description: '',
      title: '',
      isNew: true,
    },
    mode: 'onChange',
  });

  const { isSubmitting, isValid, isDirty } = form.formState;

  const onSubmit = (values: FormValues) => {
    createCountry(values);
  };

  return (
    <div className="flex-col space-y-6 py-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Button onClick={() => router.back()} variant="outline" size="sm">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
          <h1 className="text-2xl font-bold tracking-tight">Add New Country</h1>
        </div>
      </div>

      <Separator />

      {showSuccessMessage && (
        <Alert className="bg-green-50 border-green-200">
          <CheckCircle className="h-4 w-4 text-green-600" />
          <AlertTitle className="text-green-800">
            Country created successfully!
          </AlertTitle>
          <AlertDescription className="text-green-700">
            Redirecting to the countries list...
          </AlertDescription>
        </Alert>
      )}

      {isError && (
        <Alert variant="destructive">
          <Info className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            {error instanceof Error
              ? error.message
              : 'Failed to create country. Please try again.'}
          </AlertDescription>
        </Alert>
      )}

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="col-span-2">
          <Card className="border-none">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Globe className="mr-2 h-5 w-5" />
                Country Details
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-6"
                >
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Country Name*</FormLabel>
                          <FormControl>
                            <Input
                              disabled={isSubmitting || isPending}
                              placeholder="e.g. Uzbekistan"
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
                    <FormField
                      control={form.control}
                      name="emoji"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Flag Emoji*</FormLabel>
                          <FormControl>
                            <Input
                              disabled={isSubmitting || isPending}
                              placeholder="e.g. 🇺🇿"
                              {...field}
                            />
                          </FormControl>
                          <FormDescription>
                            Country flag emoji (e.g. &quot;🇺🇿&quot;,
                            &quot;🇺🇸&quot;, &quot;🇷🇺&quot;)
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
                        <FormLabel>SEO Title*</FormLabel>
                        <FormControl>
                          <Input
                            disabled={isSubmitting || isPending}
                            placeholder="e.g. Jobs and Opportunities in Uzbekistan"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          A descriptive title for SEO purposes (appears in
                          search results)
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
                        <FormLabel>Description*</FormLabel>
                        <FormControl>
                          <Textarea
                            disabled={isSubmitting || isPending}
                            placeholder="Describe the country and available job opportunities..."
                            className="min-h-[150px]"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          Detailed information about the country and its job
                          market
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="isNew"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            disabled={isSubmitting || isPending}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>Featured Country</FormLabel>
                          <FormDescription>
                            Mark this as a featured or new destination
                          </FormDescription>
                        </div>
                      </FormItem>
                    )}
                  />

                  <div className="flex justify-end space-x-4 pt-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => router.back()}
                      disabled={isSubmitting || isPending}
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      disabled={
                        !isDirty || !isValid || isSubmitting || isPending
                      }
                      className="min-w-[120px]"
                    >
                      {isPending ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Creating...
                        </>
                      ) : (
                        'Create Country'
                      )}
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>

        <div className="col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Guidelines</CardTitle>
            </CardHeader>
            <CardContent className="text-sm space-y-4">
              <div>
                <h3 className="font-medium">Country Name</h3>
                <p className="text-muted-foreground">
                  Use the official name of the country in English.
                </p>
              </div>
              <div>
                <h3 className="font-medium">Flag Emoji</h3>
                <p className="text-muted-foreground">
                  Use the standard two-letter country code emoji (e.g., 🇺🇿 for
                  Uzbekistan).
                </p>
              </div>
              <div>
                <h3 className="font-medium">Description</h3>
                <p className="text-muted-foreground">
                  Include information about job opportunities, work culture, and
                  any special requirements for working in this country.
                </p>
              </div>
            </CardContent>
            <CardFooter className="border-t bg-muted/50 p-4">
              <p className="text-xs text-muted-foreground">
                * All fields marked with an asterisk are required
              </p>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CreateCountryPage;
