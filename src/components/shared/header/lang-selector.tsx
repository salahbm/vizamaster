import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import useTranslation from '@/hooks/common/useTranslation';
import { cn } from '@/lib/utils';
import { useTranslations } from 'next-intl';

const LanguageSelector = () => {
  const t = useTranslations();
  const { locales, currentLocale, handleLocale } = useTranslation();

  const flags: Record<string, string> = {
    en: '🇺🇸',
    ru: '🇷🇺',
    uz: '🇺🇿',
  };

  return (
    <div className="relative flex items-center">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="flex items-center">
            <span className="mr-2">{flags[currentLocale]}</span>
            <span className="uppercase">{currentLocale}</span>
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {locales.map((locale: string) => {
            const isActive = locale === currentLocale;

            return (
              <DropdownMenuItem
                key={locale}
                onClick={() => handleLocale(locale)}
                className={cn(isActive && 'text-orange-500', 'cursor-pointer')}
              >
                <span className="mr-2">{flags[locale]}</span>
                {t(`Header.languages.${locale}`)}
              </DropdownMenuItem>
            );
          })}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default LanguageSelector;
