// app/customer/produk/[id]/page.tsx
'use client';

import { useParams } from 'next/navigation';
import { toys } from '@/app/data-dummy/mainan';
import { Bungee_Inline } from 'next/font/google';
import Link from 'next/link';
import Image from 'next/image';

const Bungee = Bungee_Inline({
  subsets: ['latin'],
  weight: '400'
});

export default function productDetailPage() {
  const params = useParams();
  const toyId = params.id as string;
  
  // Find the toy with the matching ID
  const toy = toys.find((toy) => toy.id === toyId);
  
  // Handle toy tidak ditemukan kembali ke halaman produk 
  if (!toy) {
    return (
      <div className="min-h-screen bg-yellow-400 flex flex-col items-center justify-center">
        <h1 className={`text-4xl mb-4 ${Bungee.className}`}>Produk tidak ditemukan</h1>
        <Link href="/customers/produk" className="bg-blue-600 text-white px-4 py-2 rounded-md">
          Kembali ke Daftar Produk
        </Link>
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-yellow-400 flex flex-col items-center pt-10 px-4">
      <div className="bg-white rounded-lg shadow-lg max-w-2xl w-full p-6">
        <h1 className="text-2xl font-semibold text-center mb-2">{toy.name}</h1>
        
        <div className="flex justify-center mb-4">
          <Image 
            src={toy.imgSrc} 
            alt={toy.name} 
            className="w-full max-w-md h-auto object-contain"
            width={200}
            height={200}
          />
        </div>
        
        <div className="text-center">
          <h2 className="text-xl font-bold mt-2">
            Harga: Rp {toy.price.toLocaleString()}
          </h2>
          
          <div className="mt-4">
            <h3 className="text-lg font-semibold">Deskripsi</h3>
            <p className="mt-2">{toy.desc}</p>
          </div>
          
          <div className="mt-6">
            <Link 
              href="/customers/produk" 
              className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors"
            >
              Kembali
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}