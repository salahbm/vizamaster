import '../styles/globals.css';
import { poppins } from '@/styles/fonts';
import { cn } from '@/lib/utils';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body
        className={cn(
          'max-w-screen-xl mx-auto overflow-x-hidden',
          poppins.className
        )}
      >
        {children}
      </body>
    </html>
  );
}
