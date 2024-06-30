import React from 'react';

const VacancyId = ({ params }: { params: { vacancyId: string } }) => {
  return <div>{params.vacancyId}</div>;
};

export default VacancyId;
