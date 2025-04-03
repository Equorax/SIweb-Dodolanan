// components/Sidebar.jsx
'use client'
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Rammetto_One } from 'next/font/google';
import Image from 'next/image';
const RammettoOneFont = Rammetto_One({
  subsets: ['latin'],
  weight: ['400']
})
const Sidebar = () => {
  const pathname = usePathname();
  
  return (
    <div className="w-48 h-full bg-white shadow-md flex flex-col">
      {/* Logo Section */}
      <div className="border-b border-gray-200">
        <div className="p-4">
        <Link href="/" className={`text-lg ${RammettoOneFont.className}`}>
            <span className="text-blue-500">D</span>
            <span className="text-purple-500">O</span>
            <span className="text-pink-500">D</span>
            <span className="text-orange-500">O</span>
            <span className="text-yellow-500">L</span>
            <span className="text-green-500">A</span>
            <span className="text-blue-500">N</span>
            <span className="text-indigo-500">A</span>
            <span className="text-violet-500">N</span>
          </Link>
        </div>
      </div>
      
      {/* Menu Items */}
      <div className="flex-1">
        <Link href="/inventory">
          <div className={`px-4 py-3 flex items-center space-x-3 ${pathname.includes('/inventory') ? 'bg-gray-100 border-l-4 border-yellow-500' : ''}`}>
           <Image
           src={'/icons/fi-rr-cube.png'}
           width={20}
           height={20}
           alt={'boxcube'}
           />
            <span className="text-gray-700">Kelola Stok</span>
          </div>
        </Link>
        
        {/* Add more menu items here as needed */}
      </div>
    </div>
  );
};

export default Sidebar;