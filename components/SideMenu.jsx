import React from 'react';
import Logo from './Logo';
import { X } from 'lucide-react';
import { HeaderData } from '@/Constants/Data';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import SocialMedia from './SocialMedia';

const SideMenu = ({ isOpen, onClose }) => {
  const pathname = usePathname();

  return (
    <>
      {/* Dark overlay */}
      <div
        className={cn(
          'fixed inset-0 z-40 bg-black/50 transition-opacity duration-300',
          isOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
        )}
        onClick={onClose}
      />

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-50 w-80 bg-black p-10 flex flex-col gap-6',
          'transition-transform duration-300 ease-out',
          isOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between gap-5">
          <Logo className="text-white" spanDesign="group-hover:text-white" />
          <button
            onClick={onClose}
            className="hover:text-shop_light_green hoverEffect transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Menu Items */}
        <nav className="flex flex-col space-y-3.5 font-semibold tracking-wide">
          {HeaderData?.map((item) => (
            <Link
              key={item.title}
              href={item.href}
              onClick={onClose}
              className={cn(
                'hover:text-shop_light_green hoverEffect transition-colors',
                pathname === item.href && 'text-white'
              )}
            >
              {item.title}
            </Link>
          ))}
        </nav>

        {/* Social icons */}
        <SocialMedia className="mt-auto" />
      </aside>
    </>
  );
};

export default SideMenu;
