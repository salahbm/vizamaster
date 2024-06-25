import { fetchAllCountries } from '@/hooks/admin/fetch-country';
import React from 'react';
import { DataTable } from './_components/data-table';
import { columns } from './_components/columns';

const Posts = async () => {
  const data = await fetchAllCountries();
  return (
    <div>
      <DataTable columns={columns} data={data} />
    </div>
  );
};

export default Posts;
