'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';

// Types
type Admin = {
  id: string;
  name: string;
  email: string;
  isAdmin: boolean;
  createdAt: string;
};

// Form schema
const formSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
});

type FormValues = z.infer<typeof formSchema>;

// API function
const updateAdmin = async ({ id, data }: { id: string; data: FormValues }) => {
  const res = await fetch(`/api/admins/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || 'Failed to update admin');
  }

  return res.json();
};

interface EditAdminDialogProps {
  admin: Admin;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function EditAdminDialog({
  admin,
  open,
  onOpenChange,
}: EditAdminDialogProps) {
  const queryClient = useQueryClient();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: admin.name,
      email: admin.email,
    },
  });

  const updateMutation = useMutation({
    mutationFn: (values: FormValues) =>
      updateAdmin({
        id: admin.id,
        data: values,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admins'] });
      toast({ title: 'Admin updated successfully' });
      onOpenChange(false);
    },
    onError: (error: Error) => {
      toast({
        title: 'Failed to update admin',
        description: error.message,
        variant: 'destructive',
      });
    },
  });

  const onSubmit = (data: FormValues) => {
    updateMutation.mutate(data);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Administrator</DialogTitle>
          <DialogDescription>
            Update the administrator&apos;s details.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 pt-4"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="Enter email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={updateMutation.isPending}>
                {updateMutation.isPending ? 'Saving...' : 'Save Changes'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
