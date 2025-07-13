import { fetchAllCountries } from '@/hooks/admin/fetch-country';
import React from 'react';
import { fetchAllVacancies } from '@/hooks/admin/fetch-vacancy';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import TableClientWrapper from './_components/table-client-wrapper';

const Posts = async () => {
  // Fetch data on the server
  const countriesData = await fetchAllCountries();
  const vacanciesData = await fetchAllVacancies();

  return (
    <div className="space-y-8">
      <Card className="border-none">
        <CardHeader>
          <CardTitle>Countries</CardTitle>
          <CardDescription>Manage all countries in the system</CardDescription>
        </CardHeader>
        <CardContent>
          <TableClientWrapper
            tableType="countries"
            initialData={countriesData}
          />
        </CardContent>
      </Card>

      <Card className="border-none">
        <CardHeader>
          <CardTitle>Vacancies</CardTitle>
          <CardDescription>
            Manage all job vacancies in the system
          </CardDescription>
        </CardHeader>
        <CardContent>
          <TableClientWrapper
            tableType="vacancies"
            initialData={vacanciesData}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default Posts;
