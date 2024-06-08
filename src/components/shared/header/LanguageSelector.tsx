import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import { useTranslations } from 'next-intl';

const LanguageSelector = () => {
  // const { t } = useTranslations();
  // const { locales, currentLocale, handleLocale } = useLocale();
  // console.log(`currentLocale:`, currentLocale);

  return (
    <div className="relative flex items-center">
      {/* <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button>
            <span className="text-sm font-bold uppercase">
              {currentLocale}{' '}
            </span>
            Down
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {locales.map((locale: string) => {
            const isActive = locale === currentLocale;

            return (
              <DropdownMenuItem
                key={locale}
                onClick={() => handleLocale(locale)}
                className={
                  cn(isActive && 'text-orange-500') && 'cursor-pointer'
                }
              >
                {t(`Header.languages.${locale}`)}
              </DropdownMenuItem>
            );
          })}
        </DropdownMenuContent>
      </DropdownMenu> */}
    </div>
  );
};

export default LanguageSelector;
