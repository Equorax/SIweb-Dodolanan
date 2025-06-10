// route: app/admin/kelola-transaksi/tambah-transaksi/page.tsx


'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Product } from '@/types/interfaces';

export default function TambahTransaksi() {
  const router = useRouter();
  
  // State for form inputs
  const [productId, setProductId] = useState('');
  const [quantity, setQuantity] = useState('1');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Selected product details
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  
  // Calculate total based on selected product and quantity
  const calculateTotal = () => {
    if (!selectedProduct || !quantity || isNaN(Number(quantity))) return 0;
    return selectedProduct.price * Number(quantity);
  };

  // Fetch products when component mounts
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
        console.error('Error fetching products:', err);
        setError('Terjadi kesalahan saat mengambil data produk');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Handle product selection change
  const handleProductChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = e.target.value;
    setProductId(selectedId);
    
    if (selectedId) {
      const product = products.find(p => p.id.toString() === selectedId);
      setSelectedProduct(product || null);
    } else {
      setSelectedProduct(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Validasi form
    if (!productId) {
      setError('Pilih produk terlebih dahulu');
      return;
    }
    
    if (!quantity || isNaN(Number(quantity)) || Number(quantity) <= 0) {
      setError('Jumlah harus berupa angka positif');
      return;
    }
    
    setIsSubmitting(true);
    setError('');
    


    try {
      // Data transaksi yang akan dikirim disesuaikan dengan attribut tabel
      const transactionData = {
        productId: Number(productId),
        quantity: Number(quantity),
      };
      
      // Kirim data transaksi ke API
      const response = await fetch('/api/transactions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(transactionData),
      });
      //jika transaksi gagal
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Gagal menambahkan transaksi');
      }
      
      // Redirect ke halaman kelola transaksi setelah berhasil
      router.push('/admin/kelola-transaksi');
      router.refresh();

    } catch (err) {
      console.error('Error adding transaction:', err);
      setError(err instanceof Error ? err.message : 'Terjadi kesalahan saat menambahkan transaksi');
    } finally {
      setIsSubmitting(false);
    }
  };




  const cancelSubmit = () => {
    router.push('/admin/kelola-transaksi');
  };

  if (loading) {
    return (
      <div className="flex h-screen">
        <div className="flex-1 flex flex-col">
          <header className="bg-yellow-500 shadow-md">
            <div className="flex justify-between items-center p-4">
              <h1 className="text-xl font-semibold text-white">Kelola Transaksi</h1>
            </div>
          </header>
          <main className="flex-1 bg-yellow-50 p-4">
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen">
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-yellow-500 shadow-md">
          <div className="flex justify-between items-center p-4">
            <h1 className="text-xl font-semibold text-white">Kelola Transaksi</h1>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 bg-yellow-50 p-4">
          <div className="max-w-xl mx-auto mt-8">
            <div className="bg-yellow-400 rounded-lg shadow-md p-8">
              {error && (
                <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4">
                  <p>{error}</p>
                </div>
              )}
              
              <form onSubmit={handleSubmit}>
                <h1 className='text-3xl mb-3 text-blue-600 font-medium'>Tambah Transaksi</h1>
                
                {/* Pilih Produk */}
                <div className="mb-8">
                  <label htmlFor="productId" className="block text-blue-600 font-medium mb-2">
                    Pilih Mainan
                  </label>
                  <select
                    id="productId"
                    value={productId}
                    onChange={handleProductChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    <option value="">-- Pilih Mainan --</option>
                    {products.map(product => (
                      <option key={product.id} value={product.id} disabled={product.stock <= 0}>
                        {product.name} - Rp {product.price.toLocaleString('id-ID')} (Stok: {product.stock})
                      </option>
                    ))}
                  </select>
                </div>

                {/* Jumlah */}
                <div className="mb-8">
                  <label htmlFor="quantity" className="block text-blue-600 font-medium mb-2">
                    Jumlah
                  </label>
                  <input
                    type="number"
                    id="quantity"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    min="1"
                    max={selectedProduct ? selectedProduct.stock : 1}
                    required
                  />
                  {selectedProduct && (
                    <p className="text-sm text-blue-600 mt-1">
                      Stok tersedia: {selectedProduct.stock}
                    </p>
                  )}
                </div>

                {/* Total (Read-only) */}
                <div className="mb-8">
                  <label htmlFor="total" className="block text-blue-600 font-medium mb-2">
                    Total Harga
                  </label>
                  <input
                    type="text"
                    id="total"
                    value={`Rp ${calculateTotal().toLocaleString('id-ID')}`}
                    className="w-full px-4 py-2 border border-gray-300 bg-gray-100 rounded-md focus:outline-none"
                    readOnly
                  />
                </div>

                {/* Submit & Cancel Button */}
                <div className='flex justify-center gap-5'>
                  <div className="flex justify-center">
                    <button
                      type="submit"
                      className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-8 rounded-md"
                      disabled={isSubmitting || !selectedProduct || selectedProduct.stock <= 0}
                    >
                      {isSubmitting ? 'Menyimpan...' : 'Konfirmasi'}
                    </button>
                  </div>

                  <div className="flex justify-center">
                    <button
                      type="button"
                      onClick={cancelSubmit}
                      className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-8 rounded-md"
                      disabled={isSubmitting}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}