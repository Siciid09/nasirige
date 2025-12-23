'use client';
import { useState } from 'react';
import Link from 'next/link';

export default function ClientHeader({ links }: { links: any[] }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="custom-header-style">
        <header className="fixed w-full top-0 left-0 z-50 bg-[#0c2448] py-7 shadow-xl transition-all">
          <div className="w-[96%] mx-auto flex justify-between items-center text-white">
            
            <Link href="/" className="text-[28px] font-bold tracking-[1px] cursor-pointer font-header" onClick={() => window.scrollTo(0,0)}>
                Nasa Ige.
            </Link>

            <nav className="hidden md:block">
              <ul className="flex gap-[35px] list-none">
                {links.map((item, i) => (
                    <li key={i}>
                        <Link href={item.link} className="text-[18px] font-medium hover:text-[#4189DD] transition font-header no-underline text-white">
                            {item.label}
                        </Link>
                    </li>
                ))}
              </ul>
            </nav>

            <div className="md:hidden cursor-pointer flex flex-col gap-1.5" onClick={() => setIsMenuOpen(!isMenuOpen)}>
               <div className="w-[30px] h-[3px] bg-white rounded-[2px]"></div>
               <div className="w-[30px] h-[3px] bg-white rounded-[2px]"></div>
               <div className="w-[30px] h-[3px] bg-white rounded-[2px]"></div>
            </div>
          </div>

          {isMenuOpen && (
             <div className="bg-[#0c2448] absolute top-full left-0 w-full p-6 flex flex-col gap-4 text-white md:hidden shadow-2xl border-t border-white/10">
                {links.map((item, i) => (
                    <Link key={i} href={item.link} onClick={() => setIsMenuOpen(false)} className="text-xl font-header block py-2">
                        {item.label}
                    </Link>
                ))}
             </div>
          )}
        </header>
      </div>
  );
}