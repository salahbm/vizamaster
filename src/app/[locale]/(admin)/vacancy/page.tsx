import React from 'react';
import CreateVacancyForm from './_components/create-form';
import { fetchAllCountries } from '@/hooks/admin/fetch-country';

const CreateVacancyPage = async () => {
  const countries = await fetchAllCountries();
  return (
    <div>
      <CreateVacancyForm countries={countries.map((country) => country.name)} />
    </div>
  );
};

export default CreateVacancyPage;
