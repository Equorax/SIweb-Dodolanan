'use client';

import React from 'react';
import Link from 'next/link';

export default function footer() {
  return (
    <footer className="bg-white pt-3 pb-3 border-t border-gray-200 mt-10 ">
    <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

        {/* Company Info */}
        <div>
          <h4 className="text-lg font-semibold text-gray-800 mb-4">DODOLANAN</h4>
          <p className="text-gray-600">
            Toko mainan dodolan membantu sang buat hati lebih cerdas dan intuitif
          </p>
        </div>
        
                     
        {/* Contact Information */}
        <div>
          <h4 className="text-lg font-semibold text-gray-800 mb-4">Hubungi kami</h4>
          <address className="not-italic text-gray-600">
            <p className="mt-2">Email: info@DODOLANAN.com</p>
            <p>Phone: 08321-888-77</p>
            <p>Instagram:@Dodolanan</p>
          </address>
        </div>


        
      {/* about us */}
      <div>
          <h4 className="text-lg font-semibold text-gray-800 mb-4">Tentang Kami</h4>
          <div className="not-italic text-gray-600">
           <Link href={'/customers/tentang-kami'} className='text-blue-600 not-italic'>Informasi Seputar Dodolanan </Link>
          </div>
        </div>

      </div>
      

      
      <div className="mt-4 pt-3 border-t border-gray-200 text-center text-gray-500 text-sm">
        <p>&copy; {new Date().getFullYear()} DODOLANAN. All rights reserved.</p>
      </div>
    </div>
  </footer>
  );
};


