'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ErrorBoundary } from 'react-error-boundary';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import AdminTable from './admin-table';
import CreateAdminDialog from './create-admin-dialog';

export default function AdminTableWrapper() {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const router = useRouter();

  const handleError = (error: Error) => {
    console.error('Error in admin management:', error);
    toast({
      title: 'Error',
      description: 'Failed to load admin management. Please try again.',
      variant: 'destructive',
    });
  };

  const handleRefresh = () => {
    router.refresh();
  };

  return (
    <ErrorBoundary
      fallback={
        <div className="flex flex-col items-center justify-center p-4">
          <p className="text-red-500 mb-4">
            Failed to load admin management. Please try again.
          </p>
          <Button onClick={handleRefresh}>Retry</Button>
        </div>
      }
      onError={handleError}
    >
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">Manage Administrators</h2>
          <Button onClick={() => setIsCreateDialogOpen(true)}>
            Add New Admin
          </Button>
        </div>
        <AdminTable />
        <CreateAdminDialog 
          open={isCreateDialogOpen} 
          onOpenChange={setIsCreateDialogOpen} 
        />
      </div>
    </ErrorBoundary>
  );
}
