import React from 'react';
import CreateVacancyForm from '../_components/create-form';
import { fetchAllCountries } from '@/hooks/admin/fetch-country';
import { fetchVacancy } from '@/hooks/admin/fetch-vacancy';
import UpdateVacancyForm from '../_components/update-form';

const VacancyDetail = async ({ params }: { params: { vacancyId: string } }) => {
  const vacancy = await fetchVacancy(params.vacancyId);
  if (!vacancy) {
    return <div>Vacancy not found</div>;
  }

  return (
    <div>
      <UpdateVacancyForm vacancy={vacancy} vacancyId={params.vacancyId} />
    </div>
  );
};

export default VacancyDetail;
