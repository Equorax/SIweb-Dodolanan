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
export default function Sidebar() {

  const pathname = usePathname();

  const sideItems = [
    {
      name: 'Dashboard', 
      path: '/admin/dashboard',
      icon: '/icons/dashboard.png', 
    },
    {
      name: 'Kelola-Stok', 
      path: '/admin/kelola-stok',
      icon: '/icons/stok-barang.png',
    },
    {
      name: 'Kelola-Transaksi', 
      path: '/admin/kelola-transaksi',
      icon: '/icons/transaksi.png',
    }
  ];


  return (
    <div className="w-48 h-full bg-white shadow-md flex flex-col">
      <div className="border-b-2 pt-[3px]  border-gray-600">
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
      
      {/* Sidebar item */}
      <div className="flex flex-col justify-between items-center space-y-6 mt-5 gap-8">
       {sideItems.map((item) =>(
        <Link
          key={item.name}
          href={item.path}
          className={`transition duration-300 text-base font-medium ${
                  pathname === item.path
                    ? 'text-blue-700 border-b-2 border-blue-700'
                    : 'text-blue-400 hover:text-blue-700'
                }`}
                
          >
           <div className="flex items-center w-full">
              <div className="w-6 h-6 mr-3">
                <Image 
                  src={item.icon} 
                  alt={`${item.name} icon`}
                  width={24}
                  height={24}
                  className={`${pathname === item.path ? 'opacity-100' : 'opacity-70'}`}
                />
              </div>
              <span>{item.name.replace('-', ' ')}</span>
            </div>
            </Link>
        ))} 
        {/* Add more menu items here as needed */}
      </div>
    </div>
  );
};

