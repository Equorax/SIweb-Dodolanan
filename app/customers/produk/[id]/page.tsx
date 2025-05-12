// // app/customer/produk/[id]/page.tsx
// 'use client';

// import { useParams } from 'next/navigation';
// import { toys } from '@/app/data-dummy/mainan';
// import { Bungee_Inline } from 'next/font/google';
// import Link from 'next/link';
// import Image from 'next/image';

// const Bungee = Bungee_Inline({
//   subsets: ['latin'],
//   weight: '400'
// });

// export default function productDetailPage() {
//   const params = useParams();
//   const toyId = params.id as string;
  
//   // Find the toy with the matching ID
//   const toy = toys.find((toy) => toy.id === toyId);
  
//   // Handle toy tidak ditemukan kembali ke halaman produk 
//   if (!toy) {
//     return (
//       <div className="min-h-screen bg-yellow-400 flex flex-col items-center justify-center">
//         <h1 className={`text-4xl mb-4 ${Bungee.className}`}>Produk tidak ditemukan</h1>
//         <Link href="/customers/produk" className="bg-blue-600 text-white px-4 py-2 rounded-md">
//           Kembali ke Daftar Produk
//         </Link>
//       </div>
//     );
//   }

//   return (
//     <section className="min-h-screen bg-yellow-400 flex flex-col items-center pt-10 px-4">
//       <div className="bg-white rounded-lg shadow-lg max-w-2xl w-full p-6">
//         <h1 className="text-2xl font-semibold text-center mb-2">{toy.name}</h1>
        
//         <div className="flex justify-center mb-4">
//           <Image 
//             src={toy.imgSrc} 
//             alt={toy.name} 
//             className="w-full max-w-md h-auto object-contain"
//             width={200}
//             height={200}
//           />
//         </div>
        
//         <div className="text-center">
//           <h2 className="text-xl font-bold mt-2">
//             Harga: Rp {toy.price.toLocaleString()}
//           </h2>
          
//           <div className="mt-4">
//             <h3 className="text-lg font-semibold">Deskripsi</h3>
//             <p className="mt-2">{toy.desc}</p>
//           </div>
          
//           <div className="mt-6">
//             <Link 
//               href="/customers/produk" 
//               className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors"
//             >
//               Kembali
//             </Link>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
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

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProductDetail = async () => {
      try {
        const productId = params.id as string;
        const response = await fetch(`/api/products/${productId}`);
        
        if (!response.ok) {
          if (response.status === 404) {
            setError('Produk tidak ditemukan');
          } else {
            throw new Error('Gagal mengambil detail produk');
          }
          return;
        }
        
        const data = await response.json();
        setProduct(data);
      } catch (err) {
        setError('Terjadi kesalahan saat mengambil detail produk');
        console.error('Error fetching product details:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetail();
  }, [params.id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-yellow-400 flex flex-col items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-700"></div>
      </div>
    );
  }

  if (error || !product) {
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
        <h1 className="text-2xl font-semibold text-center mb-2">{product.name}</h1>
        
        <div className="flex justify-center mb-4">
          {product.imageUrl ? (
            <div className="relative w-full h-64">
              <Image 
                src={product.imageUrl} 
                alt={product.name} 
                className="object-contain"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
          ) : (
            <div className="w-full h-64 bg-gray-200 flex items-center justify-center">
              <p className="text-gray-500">Tidak ada gambar</p>
            </div>
          )}
        </div>
        
        <div className="text-center">
          <h2 className="text-xl font-bold mt-2">
            Harga: Rp {product.price.toLocaleString()}
          </h2>
          
          <div className="mt-4">
            <h3 className="text-lg font-semibold">Deskripsi</h3>
            <p className="mt-2">{product.description || 'Tidak ada deskripsi'}</p>
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