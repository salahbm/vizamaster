'use client';

import React, { Suspense } from 'react';
import { DataTable } from './data-table';
import { columns } from './columns';
import { vacancyColumns } from './vacancy-column';
import { Skeleton } from '@/components/ui/skeleton';
import { ErrorBoundary } from 'react-error-boundary';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

// Loading fallback component for tables
const TableSkeleton = () => (
  <div className="space-y-4">
    <div className="flex items-center justify-between">
      <Skeleton className="h-8 w-[250px]" />
      <Skeleton className="h-8 w-[180px]" />
    </div>
    <div className="rounded-md border">
      <Skeleton className="h-[400px] w-full" />
    </div>
  </div>
);

// Error fallback component
const ErrorFallback = ({
  error,
  resetErrorBoundary,
}: {
  error: Error;
  resetErrorBoundary: () => void;
}) => (
  <Card className="w-full">
    <CardHeader>
      <CardTitle className="text-red-500">Something went wrong</CardTitle>
      <CardDescription>{error.message}</CardDescription>
    </CardHeader>
    <CardContent>
      <button
        onClick={resetErrorBoundary}
        className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
      >
        Try again
      </button>
    </CardContent>
  </Card>
);

interface TableClientWrapperProps {
  tableType: 'countries' | 'vacancies';
  initialData: any[];
}

const TableClientWrapper: React.FC<TableClientWrapperProps> = ({ 
  tableType, 
  initialData 
}) => {
  // Choose the appropriate columns based on table type
  const tableColumns = tableType === 'countries' ? columns : vacancyColumns;
  
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <Suspense fallback={<TableSkeleton />}>
        <DataTable columns={tableColumns} data={initialData} />
      </Suspense>
    </ErrorBoundary>
  );
};

export default TableClientWrapper;
