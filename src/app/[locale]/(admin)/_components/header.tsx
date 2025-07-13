import { cn } from '@/lib/utils';
import Link from 'next/link';
import { UserNav } from './user-nav';
import { MobileSidebar } from './mobile-nav';
import Image from 'next/image';

export default function Header() {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
      <nav className="flex h-14 items-center justify-between px-4 sm:px-6 md:px-8 mx-auto max-w-7xl">
        <div className="hidden lg:block">
          <Link href="/" className="flex items-center justify-start flex-row">
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
              VIZA <span className="textGradient">MASTER</span>
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
