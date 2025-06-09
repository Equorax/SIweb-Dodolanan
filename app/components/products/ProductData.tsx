// components/products/ProductData.tsx
import { Suspense } from 'react';
import { Product } from '@/types/interfaces';
import ProductTable from './ProductTable';
import ProductTableSkeleton from '../skeleton/ProductTableSkeleton';

// Fungsi untuk mengambil data dari server
async function getProducts(): Promise<Product[]> {
  try {
    // Mengakses API route langsung melalui import
    // Sesuaikan path sesuai dengan lokasi file API Anda
    const res = await import('@/app/api/products/route');
    
    // Akses handler GET dari route file
    // Pastikan Anda memiliki fungsi GET di route file API Anda
    const response = await res.GET();
    
    // Parse response JSON
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error saat mengambil data produk:', error);
    
    // Kembalikan array kosong atau data dummy jika terjadi error
    return [];
  }
}

// Component utama untuk data produk yang ditampilkan
export default async function ProductData() {
  // Mengambil data produk
  const produk = await getProducts();
  
  return <ProductTable produk={produk} />;
}

// Komponen wrapper dengan Suspense untuk lazy loading
export function ProductDataWithSuspense() {
  return (
    <Suspense fallback={<ProductTableSkeleton />}>
      <ProductData />
    </Suspense>
  );
}