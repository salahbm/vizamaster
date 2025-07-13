'use client';

import { useState } from 'react';
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
import { Eye, EyeOff } from 'lucide-react';

// Types
type Admin = {
  id: string;
  name: string;
  email: string;
  isAdmin: boolean;
  createdAt: string;
};

// Form schema
const formSchema = z
  .object({
    password: z.string().min(8, 'Password must be at least 8 characters'),
    confirmPassword: z.string().min(8, 'Password must be at least 8 characters'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

type FormValues = z.infer<typeof formSchema>;

// API function
const resetPassword = async ({ id, password }: { id: string; password: string }) => {
  const res = await fetch(`/api/admins/${id}/reset-password`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ password }),
  });
  
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || 'Failed to reset password');
  }
  
  return res.json();
};

interface ResetPasswordDialogProps {
  admin: Admin;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function ResetPasswordDialog({ 
  admin, 
  open, 
  onOpenChange 
}: ResetPasswordDialogProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const queryClient = useQueryClient();
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });

  const resetMutation = useMutation({
    mutationFn: (values: FormValues) => resetPassword({ 
      id: admin.id, 
      password: values.password 
    }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admins'] });
      toast({ title: 'Password reset successfully' });
      form.reset();
      onOpenChange(false);
    },
    onError: (error: Error) => {
      toast({
        title: 'Failed to reset password',
        description: error.message,
        variant: 'destructive',
      });
    },
  });

  const onSubmit = (data: FormValues) => {
    resetMutation.mutate(data);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Reset Password</DialogTitle>
          <DialogDescription>
            Set a new password for {admin.name} ({admin.email}).
          </DialogDescription>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 pt-4">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>New Password</FormLabel>
                  <div className="relative">
                    <FormControl>
                      <Input 
                        type={showPassword ? 'text' : 'password'} 
                        placeholder="Enter new password" 
                        {...field} 
                      />
                    </FormControl>
                    <button
                      type="button"
                      onClick={togglePasswordVisibility}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                      tabIndex={-1}
                    >
                      {showPassword ? (
                        <EyeOff size={20} aria-hidden="true" />
                      ) : (
                        <Eye size={20} aria-hidden="true" />
                      )}
                      <span className="sr-only">
                        {showPassword ? 'Hide password' : 'Show password'}
                      </span>
                    </button>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <div className="relative">
                    <FormControl>
                      <Input 
                        type={showConfirmPassword ? 'text' : 'password'} 
                        placeholder="Confirm new password" 
                        {...field} 
                      />
                    </FormControl>
                    <button
                      type="button"
                      onClick={toggleConfirmPasswordVisibility}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                      tabIndex={-1}
                    >
                      {showConfirmPassword ? (
                        <EyeOff size={20} aria-hidden="true" />
                      ) : (
                        <Eye size={20} aria-hidden="true" />
                      )}
                      <span className="sr-only">
                        {showConfirmPassword ? 'Hide password' : 'Show password'}
                      </span>
                    </button>
                  </div>
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
              <Button 
                type="submit" 
                disabled={resetMutation.isPending}
              >
                {resetMutation.isPending ? 'Resetting...' : 'Reset Password'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
