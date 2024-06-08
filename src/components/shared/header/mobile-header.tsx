import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

import { Menu } from 'lucide-react';
import Navbar from './nav-bar';

const MobileNavbar = () => {
  return (
    <Sheet>
      <SheetTrigger className="md:hidden pr-4 hover:opacity-75 transition">
        <Menu />
      </SheetTrigger>

      <SheetContent side={'right'} className="p-0 bg-white w-72 pt-10">
        <Navbar />
      </SheetContent>
    </Sheet>
  );
};

export default MobileNavbar;
