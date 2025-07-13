import { Suspense } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AdminTableWrapper from './_components/admin-table-wrapper';

export const metadata = {
  title: 'Admin Management',
};

export default function AdminsPage() {
  return (
    <div className="container mx-auto py-10">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Admin Management</CardTitle>
        </CardHeader>
        <CardContent>
          <Suspense fallback={<div>Loading admin management...</div>}>
            <AdminTableWrapper />
          </Suspense>
        </CardContent>
      </Card>
    </div>
  );
}
