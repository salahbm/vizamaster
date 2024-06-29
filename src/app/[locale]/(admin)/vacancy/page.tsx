import React from 'react';
import CreateVacancyForm from './_components/create-form';
import { fetchAllCountries } from '@/hooks/admin/fetch-country';

const CreateVacancyPage = async () => {
  const countries = await fetchAllCountries();

  return (
    <div>
      <CreateVacancyForm
        countries={countries.map(({ name, id, emoji }) => ({
          name,
          id,
          emoji,
        }))}
      />
    </div>
  );
};

export default CreateVacancyPage;
