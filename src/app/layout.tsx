import '../styles/globals.css';
import { poppins } from '@/styles/fonts';
import { cn } from '@/lib/utils';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
