// route: app/admin/kelola-transaksi/edit-transaksi/page.tsx

'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { Transaction, Product } from '@/types/interfaces';

export default function EditTransaksi() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const transactionId = searchParams.get('id');
  
  // State for form inputs
  const [quantity, setQuantity] = useState('');
  const [transaction, setTransaction] = useState<Transaction | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  
  // Calculate total based on transaction and quantity
  const calculateTotal = () => {
    if (!transaction || !quantity || isNaN(Number(quantity))) return 0;
    return transaction.product.price * Number(quantity);
  };

  // Fetch transaction data when component mounts
  useEffect(() => {
    if (!transactionId) {
      setError('ID transaksi tidak ditemukan');
      setIsLoading(false);
      return;
    }

    const fetchTransaction = async () => {
      try {
        const response = await fetch(`/api/transactions/${transactionId}`);
        
        if (!response.ok) {
          throw new Error('Gagal mengambil data transaksi');
        }
        
        const transactionData: Transaction = await response.json();
        setTransaction(transactionData);
        setQuantity(transactionData.quantity.toString());
      } catch (err) {
        console.error('Error fetching transaction:', err);
        setError(err instanceof Error ? err.message : 'Terjadi kesalahan saat mengambil data transaksi');
      } finally {
        setIsLoading(false);
      }
    };

    fetchTransaction();
  }, [transactionId]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!transactionId || !transaction) {
      setError('ID transaksi tidak ditemukan');
      return;
    }
    
    // Validasi form
    if (!quantity || isNaN(Number(quantity)) || Number(quantity) <= 0) {
      setError('Jumlah harus berupa angka positif');
      return;
    }
    
    setIsSubmitting(true);
    setError('');
    
    try {
      // Data transaksi yang akan diupdate
      const transactionData = {
        quantity: Number(quantity),
      };
      
      // Kirim data transaksi ke API
      const response = await fetch(`/api/transactions/${transactionId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(transactionData),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Gagal memperbarui transaksi');
      }
      
      // Redirect ke halaman kelola transaksi setelah berhasil
      router.push('/admin/kelola-transaksi');
      router.refresh();
    } catch (err) {
      console.error('Error updating transaction:', err);
      setError(err instanceof Error ? err.message : 'Terjadi kesalahan saat memperbarui transaksi');
    } finally {
      setIsSubmitting(false);
    }
  };

  const cancelSubmit = () => {
    router.push('/admin/kelola-transaksi');
  };

  if (isLoading) {
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

  if (!transaction) {
    return (
      <div className="flex h-screen">
        <div className="flex-1 flex flex-col">
          <header className="bg-yellow-500 shadow-md">
            <div className="flex justify-between items-center p-4">
              <h1 className="text-xl font-semibold text-white">Kelola Transaksi</h1>
            </div>
          </header>
          <main className="flex-1 bg-yellow-50 p-4">
            <div className="max-w-xl mx-auto mt-8">
              <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                <p>{error || 'Transaksi tidak ditemukan'}</p>
                <button 
                  onClick={() => router.push('/admin/kelola-transaksi')}
                  className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
                >
                  Kembali ke Daftar Transaksi
                </button>
              </div>
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
            <div className="flex items-center">
              <div className="flex items-center mr-2">
                <div className="h-8 w-8 bg-white rounded-full overflow-hidden mr-2">
                  <Image src="/assets/Atmin.jpg" alt="Admin" className="h-full w-full object-cover" 
                  width={20}
                  height={20}/>
                </div>
                <span className="text-white text-sm">Admin</span>
              </div>
            </div>
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
                <h1 className='text-3xl mb-3 text-blue-600 font-medium'>Edit Transaksi</h1>
                
                {/* ID Transaksi - Read only */}
                <div className="mb-6">
                  <label htmlFor="id" className="block text-blue-600 font-medium mb-2">
                    ID Transaksi
                  </label>
                  <input
                    type="text"
                    id="id"
                    value={transaction.id}
                    className="w-full px-4 py-2 border border-gray-300 bg-gray-100 rounded-md focus:outline-none"
                    readOnly
                  />
                </div>
                
                {/* Nama Produk - Read only */}
                <div className="mb-6">
                  <label htmlFor="productName" className="block text-blue-600 font-medium mb-2">
                    Nama Mainan
                  </label>
                  <div className="flex items-center w-full px-4 py-2 border border-gray-300 bg-gray-100 rounded-md">
                    {transaction.product.imageUrl ? (
                      <img src={transaction.product.imageUrl} alt={transaction.product.name} className="h-6 w-6 mr-2 object-cover" />
                    ) : (
                      <div className="bg-red-500 h-6 w-6 mr-2"></div>
                    )}
                    <span>{transaction.product.name}</span>
                  </div>
                </div>

                {/* Harga Produk - Read only */}
                <div className="mb-6">
                  <label htmlFor="price" className="block text-blue-600 font-medium mb-2">
                    Harga Satuan
                  </label>
                  <input
                    type="text"
                    id="price"
                    value={`Rp ${transaction.product.price.toLocaleString('id-ID')}`}
                    className="w-full px-4 py-2 border border-gray-300 bg-gray-100 rounded-md focus:outline-none"
                    readOnly
                  />
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
                    max={transaction.quantity + transaction.product.stock}
                    required
                  />
                  <p className="text-sm text-blue-600 mt-1">
                    Stok tersedia: {transaction.product.stock + transaction.quantity} (termasuk dalam transaksi ini)
                  </p>
                </div>

                {/* Total Baru (Read-only) */}
                <div className="mb-8">
                  <label htmlFor="total" className="block text-blue-600 font-medium mb-2">
                    Total Harga Baru
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
                      disabled={isSubmitting}
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