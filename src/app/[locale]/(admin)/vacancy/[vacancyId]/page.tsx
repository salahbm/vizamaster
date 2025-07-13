import React from 'react';
import { fetchVacancy } from '@/hooks/admin/fetch-vacancy';
import UpdateVacancyForm from '../_components/update-form';
import EmptyState from '@/components/shared/no-data';

const VacancyDetail = async ({ params }: { params: { vacancyId: string } }) => {
  const vacancy = await fetchVacancy(params.vacancyId);
  if (!vacancy) {
    return <EmptyState />;
  }

  return <UpdateVacancyForm vacancy={vacancy} vacancyId={params.vacancyId} />;
};

export default VacancyDetail;
