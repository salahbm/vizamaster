import { ContractsView } from '@/components/contract';
import { NextPage } from 'next';

// Force dynamic rendering to avoid SSR issues with react-pdf
export const dynamic = 'force-dynamic';

const Contracts: NextPage = () => <ContractsView />;

export default Contracts;
