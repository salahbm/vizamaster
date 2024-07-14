import { cn } from '@/lib/utils';
import Link from 'next/link';
import { UserNav } from './user-nav';
import { MobileSidebar } from './mobile-nav';
import Image from 'next/image';

export default function Header() {
  return (
    <div className="">
      <nav className="flex h-14 items-center justify-between px-4">
        <div className="hidden lg:block">
          <Link
            href="/jobs"
            className="flex items-center justify-start  flex-row"
          >
            <Image
              src="/logos/dark_logo.png"
              alt="logo"
              width={50}
              height={50}
              className="object-cover"
            />

            <p
              className={cn(
                'text-sm md:text-lg font-bold whitespace-nowrap -ml-1'
              )}
            >
              BS <span className="textGradient">GROUP</span> ADMIN
            </p>
          </Link>
        </div>
        <div className={cn('block lg:!hidden')}>
          <MobileSidebar />
        </div>

        <div className="flex items-center gap-2">
          <UserNav />
        </div>
      </nav>
    </div>
  );
}
