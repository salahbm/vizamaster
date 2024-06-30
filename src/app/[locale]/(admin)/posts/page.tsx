import { fetchAllCountries } from '@/hooks/admin/fetch-country';
import React from 'react';
import { DataTable } from './_components/data-table';
import { columns } from './_components/columns';
import { fetchAllVacancies } from '@/hooks/admin/fetch-vacancy';
import { vacancyColumns } from './_components/vacancy-column';
import { Separator } from '@/components/ui/separator';

const Posts = async () => {
  const data = await fetchAllCountries();
  const vacancy = await fetchAllVacancies();
  return (
    <div>
      <div className="min-h-screen/2 max-h-screen/2">
        <DataTable columns={columns} data={data} />
      </div>
      <Separator className="my-4" />
      <div className="max-h-screen/2 min-h-screen/2">
        <DataTable columns={vacancyColumns} data={vacancy} />
      </div>
    </div>
  );
};

export default Posts;
