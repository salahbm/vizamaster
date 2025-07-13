'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Icons } from '@/components/shared/icons';
import { toast } from '@/components/ui/use-toast';

// Define the form schema for social media configurations
const socialMediaSchema = z.object({
  instagram_url: z
    .string()
    .url('Please enter a valid URL')
    .optional()
    .or(z.literal('')),
  instagram_api: z.string().optional().or(z.literal('')),
  instagram_secret: z.string().optional().or(z.literal('')),
  telegram_url: z
    .string()
    .url('Please enter a valid URL')
    .optional()
    .or(z.literal('')),
  telegram_api: z.string().optional().or(z.literal('')),
  telegram_secret: z.string().optional().or(z.literal('')),
});

type SocialMediaFormValues = z.infer<typeof socialMediaSchema>;

export default function SocialMediaSettingsPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('instagram');

  // Initialize form with default values
  const form = useForm<SocialMediaFormValues>({
    resolver: zodResolver(socialMediaSchema),
    defaultValues: {
      instagram_url: '',
      instagram_api: '',
      instagram_secret: '',
      telegram_url: '',
      telegram_api: '',
      telegram_secret: '',
    },
  });

  // Fetch existing configurations on component mount
  useEffect(() => {
    const fetchConfigs = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get('/api/admin/settings/social-media');
        if (response.data) {
          // Update form values with existing configurations
          const configs = response.data.reduce((acc: any, config: any) => {
            acc[config.key] = config.value;
            return acc;
          }, {});

          form.reset({
            instagram_url: configs.instagram_url || '',
            instagram_api: configs.instagram_api || '',
            instagram_secret: configs.instagram_secret || '',
            telegram_url: configs.telegram_url || '',
            telegram_api: configs.telegram_api || '',
            telegram_secret: configs.telegram_secret || '',
          });
        }
      } catch (error) {
        console.error('Failed to fetch social media configurations:', error);
        toast({
          title: 'Error',
          description: 'Failed to load configurations',
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchConfigs();
  }, [form]);

  // Handle form submission
  const onSubmit = async (data: SocialMediaFormValues) => {
    setIsLoading(true);
    try {
      await axios.post('/api/admin/settings/social-media', data);
      toast({
        title: 'Success',
        description: 'Social media configurations saved successfully',
      });
      router.refresh();
    } catch (error) {
      console.error('Failed to save social media configurations:', error);
      toast({
        title: 'Error',
        description: 'Failed to save configurations',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Social Media Settings</h1>
        <p className="text-muted-foreground mt-2">
          Configure your social media API keys and URLs for integration
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="instagram">Instagram</TabsTrigger>
              <TabsTrigger value="telegram">Telegram</TabsTrigger>
            </TabsList>

            <TabsContent value="instagram">
              <Card>
                <CardHeader>
                  <CardTitle>Instagram Configuration</CardTitle>
                  <CardDescription>
                    Enter your Instagram API credentials and URL for integration
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <FormField
                    control={form.control}
                    name="instagram_url"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Instagram URL</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="https://instagram.com/your_account"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          The URL to your Instagram profile
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="instagram_api"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>API Key</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter your Instagram API key"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          Your Instagram API key for accessing the Instagram API
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="instagram_secret"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>API Secret</FormLabel>
                        <FormControl>
                          <Input
                            type="password"
                            placeholder="Enter your Instagram API secret"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          Your Instagram API secret for authentication
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="telegram">
              <Card>
                <CardHeader>
                  <CardTitle>Telegram Configuration</CardTitle>
                  <CardDescription>
                    Enter your Telegram bot API credentials and URL for
                    integration
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <FormField
                    control={form.control}
                    name="telegram_url"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Telegram URL</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="https://t.me/your_bot"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          The URL to your Telegram bot or channel
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="telegram_api"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Bot API Key</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter your Telegram bot API key"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          Your Telegram bot API key for accessing the Telegram
                          API
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="telegram_secret"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>API Secret</FormLabel>
                        <FormControl>
                          <Input
                            type="password"
                            placeholder="Enter your Telegram API secret"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          Your Telegram API secret for authentication (if
                          applicable)
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <CardFooter className="flex justify-end">
            <Button type="submit" disabled={isLoading}>
              {isLoading && (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              )}
              Save Settings
            </Button>
          </CardFooter>
        </form>
      </Form>
    </div>
  );
}
