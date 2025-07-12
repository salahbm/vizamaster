import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet';

import { EllipsisVertical } from 'lucide-react';
import navBars from './nav-list';

import { cn } from '@/lib/utils';
import LanguageSelector from './lang-selector';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

const MobileNavbar = () => {
  const pathname = usePathname();
  const t = useTranslations('Header');
  return (
    <Sheet>
      <SheetTrigger className="md:hidden hover:scale-110  transition mt-1 ">
        <EllipsisVertical />
      </SheetTrigger>

      <SheetContent side={'right'} className="p-0 bg-white w-72 pt-10">
        <ul className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 mt-4 md:mt-0">
          {navBars.map((item) => (
            <li
              key={item.id}
              className={cn(
                'flex items-center justify-center gap-x-2 text-black text-sm p-2  hover:text-orange-500 hover:bg-sky-600/20 transform duration-300 transition-colors',
                pathname?.endsWith(item.path!) &&
                  'text-[var(--primary)] bg-sky-200/20 hover:bg-sky-200/20 hover:text-[var(--primary)]'
              )}
            >
              <SheetClose asChild>
                <Link href={item.path!}>
                  {t(`nav.${item.name.toLocaleLowerCase()}`)}
                </Link>
              </SheetClose>
            </li>
          ))}
          <li className="flex items-center justify-center gap-x-2  text-sm p-2 ">
            <LanguageSelector />
          </li>
        </ul>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNavbar;
