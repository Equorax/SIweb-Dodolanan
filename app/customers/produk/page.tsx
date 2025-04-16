import React from 'react';
import { Bungee_Inline } from 'next/font/google';
import {toys} from '@/app/data-dummy/mainan'; // object berupa array yang di import kesini
import Link from 'next/link'
import Image from 'next/image';

const Bungee = Bungee_Inline({
  subsets: ['latin'],
  weight: '400'
})

export default function produkPage() {

  return (
    <>
     <section className='flex flex-col items-center min-h-screen bg-yellow-400 '>
  
        <div className='flex-col justify-center items-center'>
          <h1 className={`text-6xl lg:text-9xl mb-5 mt-10 font-bold text-blue-700 text-center ${Bungee.className}`}>PRODUK</h1>
          <hr className='border-4 border-white mt-2'/>
        </div>
           {/* // mapping link image to detail produk */}
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 my-8 w-full max-w-7xl px-2">

            {toys.map((toy) => (
              <Link 
                href={`/customers/produk/${toy.id}`} 
                key={toy.id} 
                className="bg-white rounded-lg overflow-hidden shadow-lg transform transition-transform hover:scale-105"
              >
                <div className="p-4">
                  <Image 
                    src={toy.imgSrc} 
                    alt={toy.name} 
                    className="w-full h-48 object-contain"
                    width={200}
                    height={200}
                  />
                  <h2 className="text-xl font-semibold mt-2 text-center">{toy.name}</h2>
                </div>
              </Link>
  ))}
</div>

    </section> 
    </>
   
  )
}
