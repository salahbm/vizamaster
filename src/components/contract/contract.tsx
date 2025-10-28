import React from 'react';
import ContractGrid from './contract-grid';

interface IContractsViewProps {}

const ContractsView: React.FC<IContractsViewProps> = (props) => (
  <div className="min-h-screen mt-35">
    {/* Contracts Grid */}
    <ContractGrid />
  </div>
);

export { ContractsView };
