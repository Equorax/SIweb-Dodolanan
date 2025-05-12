// // route: app/customers/produk/page.tsx

// import React from 'react';
// import { Bungee_Inline } from 'next/font/google';
// import {toys} from '@/app/data-dummy/mainan'; // object berupa array yang di import kesini
// import Link from 'next/link'
// import Image from 'next/image';

// const Bungee = Bungee_Inline({
//   subsets: ['latin'],
//   weight: '400'
// })

// export default function produkPage() {

//   return (
//     <>
//      <section className='flex flex-col items-center min-h-screen bg-yellow-400 '>
  
//         <div className='flex-col justify-center items-center'>
//           <h1 className={`text-6xl lg:text-9xl mb-5 mt-10 font-bold text-blue-700 text-center ${Bungee.className}`}>PRODUK</h1>
//           <hr className='border-4 border-white mt-2'/>
//         </div>
//            {/* // mapping link image to detail produk */}
//            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 my-8 w-full max-w-7xl px-2">

//             {toys.map((toy) => (
//               <Link 
//                 href={`/customers/produk/${toy.id}`} 
//                 key={toy.id} 
//                 className="bg-white rounded-lg overflow-hidden shadow-lg transform transition-transform hover:scale-105"
//               >
//                 <div className="p-4">
//                   <Image 
//                     src={toy.imgSrc} 
//                     alt={toy.name} 
//                     className="w-full h-48 object-contain"
//                     width={200}
//                     height={200}
//                   />
//                   <h2 className="text-xl font-semibold mt-2 text-center">{toy.name}</h2>
//                 </div>
//               </Link>
//   ))}
// </div>

//     </section> 
//     </>
   
//   )
// }


'use client';

import React, { useEffect, useState } from 'react';
import { Bungee_Inline } from 'next/font/google';
import Link from 'next/link';
import Image from 'next/image';

const Bungee = Bungee_Inline({
  subsets: ['latin'],
  weight: '400'
});

// Definisikan tipe data untuk produk
interface Product {
  id: number;
  name: string;
  price: number;
  stock: number;
  description: string | null;
  imageUrl: string | null;
  createdAt: string;
  updatedAt: string;
}

export default function ProdukPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/products');
        if (!response.ok) {
          throw new Error('Gagal mengambil data produk');
        }
        const data = await response.json();
        setProducts(data);
      } catch (err) {
        setError('Terjadi kesalahan saat mengambil data produk');
        console.error('Error fetching products:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <>
      <section className='flex flex-col items-center min-h-screen bg-yellow-400'>
        <div className='flex-col justify-center items-center'>
          <h1 className={`text-6xl lg:text-9xl mb-5 mt-10 font-bold text-blue-700 text-center ${Bungee.className}`}>PRODUK</h1>
          <hr className='border-4 border-white mt-2' />
        </div>

        {loading ? (
          <div className="flex justify-center items-center min-h-[400px]">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-700"></div>
          </div>
        ) : error ? (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded my-4">
            <p>{error}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 my-8 w-full max-w-7xl px-2">
            {products.length === 0 ? (
              <div className="col-span-full text-center py-10">
                <p className="text-xl">Tidak ada produk yang tersedia saat ini.</p>
              </div>
            ) : (
              products.map((product) => (
                <Link
                  href={`/customers/produk/${product.id}`}
                  key={product.id}
                  className="bg-white rounded-lg overflow-hidden shadow-lg transform transition-transform hover:scale-105"
                >
                  <div className="p-4">
                    <div className="relative w-full h-48">
                      {product.imageUrl ? (
                        <Image
                          src={product.imageUrl}
                          alt={product.name}
                          className="object-contain"
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 20vw"
                        />
                      ) : (
                        <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                          <p className="text-gray-500">Tidak ada gambar</p>
                        </div>
                      )}
                    </div>
                    <h2 className="text-xl font-semibold mt-2 text-center">{product.name}</h2>
                  </div>
                </Link>
              ))
            )}
          </div>
        )}
      </section>
    </>
  );
}