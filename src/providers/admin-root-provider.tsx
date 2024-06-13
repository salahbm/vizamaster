import { ClerkProvider } from '@clerk/nextjs';
import { PropsWithChildren } from 'react';

export default function AdminProvider({ children }: PropsWithChildren) {
  return <ClerkProvider>{children}</ClerkProvider>;
}
