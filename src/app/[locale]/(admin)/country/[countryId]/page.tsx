import { toast } from '@/components/ui/use-toast';
import { fetchCountry } from '@/hooks/admin/fetch-country';
import React from 'react';

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

const CountryIdPage = async ({ params }: { params: { countryId: string } }) => {
  const country = await fetchCountry(params.countryId);
  if (!country) {
    toast({ title: 'Country not found' });
  }

  return (
    <div className="flex justify-center h-full p-6">
      <div>
        <h1 className="textGradient text-2xl">Name the country</h1>

        <p className="text-sm text-slate-600">
          This section will help you name the country and its related data.
        </p>

        {/* <Form {...form}>
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
            >
              Continue
            </Button>
          </div>
        </form>
      </Form> */}
      </div>
    </div>
  );
};

export default CountryIdPage;
