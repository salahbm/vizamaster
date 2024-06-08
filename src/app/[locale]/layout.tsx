import AppProvider from '@/providers';
import TranslationsProvider from '@/providers/TranslationsProvider';

export default function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  return (
    <html lang={locale}>
      <body>
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}
