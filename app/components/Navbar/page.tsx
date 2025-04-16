'use client';
import React from 'react'
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { Rammetto_One } from 'next/font/google';

const RammettoOneFont = Rammetto_One({
  subsets: ['latin'],
  weight: "400"
})




export default function Navbar() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { name: 'Beranda', path: '/customers/beranda' },
    { name: 'Katalog', path: '/customers/katalog' },
    { name: 'Produk', path: '/customers/produk' },
    { name: 'Testimoni', path: '/customers/testimoni' },
    { name: 'Tentang Kami', path: '/customers/tentang-kami' },
  ];

  return (
    <nav className="bg-white shadow-sm py-4 px-6 w-full overflow-x-hidden">
      <div className=" flex justify-between items-center">
        
        <div className="flex-shrink-0 mr-auto">
          <Link href="/" className={`text-4xl ${RammettoOneFont.className}`}>
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

        {/* Desktop Navigation */}
        <div className="hidden lg:flex space-x-6 ml-auto pr-8 w-1/3 ">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.path}
              className={`transition duration-300 text-base font-medium ${
                pathname === item.path 
                ? 'text-blue-700 border-b-2 border-blue-700'
                : 'text-blue-400 hover:text-blue-700'
              }`}
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* Mobile menu button */}
        <div className="lg:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-gray-600 hover:text-blue-500 focus:outline-none"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMenuOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16m-7 6h7" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="lg:hidden mt-4 pb-2">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.path}
              className={`block py-2 px-6 ${
                pathname === item.path
                  ? 'text-blue-500 font-medium'
                  : 'text-gray-600 hover:text-blue-500'
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              {item.name}
            </Link>
          ))}
        </div>
      )}
    </nav>
  )
}
