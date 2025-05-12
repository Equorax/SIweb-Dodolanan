'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Transaction } from '@/types/interfaces';

export default function KelolaTransaksi() {
  const router = useRouter();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    // Fetch transactions
    const fetchTransactions = async () => {
      try {
        const response = await fetch('/api/transactions');
        if (!response.ok) {
          throw new Error('Gagal mengambil data transaksi');
        }
        const data = await response.json();
        setTransactions(data);
      } catch (err) {
        setError('Terjadi kesalahan saat mengambil data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  const handleAddTransaction = () => {
    router.push('/admin/kelola-transaksi/tambah-transaksi');
  };

  const handleEditTransaction = (id: number) => {
    router.push(`/admin/kelola-transaksi/edit-transaksi?id=${id}`);
  };

  const handleDeleteTransaction = async (id: number) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus transaksi ini?')) {
      try {
        const response = await fetch(`/api/transactions/${id}`, {
          method: 'DELETE',
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Gagal menghapus transaksi');
        }

        // Refresh transaksi setelah menghapus
        setTransactions((prevTransactions) => 
          prevTransactions.filter((transaction) => transaction.id !== id)
        );
      } catch (err) {
        console.error('Error deleting transaction:', err);
        alert(err instanceof Error ? err.message : 'Gagal menghapus transaksi');
      }
    }
  };

  // Filter transactions based on search query
  const filteredTransactions = transactions.filter(transaction => 
    transaction.product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    transaction.id.toString().includes(searchQuery) ||
    transaction.productId.toString().includes(searchQuery)
  );

  // Format date to a more readable format
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (loading) {
    return (
      <div className="container mx-auto p-4">
        <div className="bg-yellow-500 p-4 rounded-t-sm">
          <h1 className="text-xl font-bold">Daftar Transaksi</h1>
        </div>
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-4">
        <div className="bg-yellow-500 p-4 rounded-t-sm">
          <h1 className="text-xl font-bold">Daftar Transaksi</h1>
        </div>
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mt-4">
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="bg-yellow-500 p-5">
        <h1 className="text-xl font-semibold text-white">Kelola Transaksi</h1>
      </div>
      
      <div className='mt-10 bg-yellow-500 pt-5'>
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-bold pl-5">Daftar Transaksi</h1>
          <div className="flex space-x-2">
            <div className="relative p">
              <input
                type="text"
                placeholder="Cari Transaksi..."
                className="border rounded-md px-3 py-1 pr-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
            <button 
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 rounded-md"
              onClick={handleAddTransaction}
            >
              Tambah Transaksi
            </button>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse bg-yellow-500">
          <thead>
            <tr className="bg-yellow-500">
              <th className="border px-4 py-2 text-left">ID Transaksi</th>
              <th className="border px-4 py-2 text-left">Nama Mainan</th>
              <th className="border px-4 py-2 text-left">Harga Satuan</th>
              <th className="border px-4 py-2 text-left">Jumlah</th>
              <th className="border px-4 py-2 text-left">Total</th>
              <th className="border px-4 py-2 text-left">Tanggal</th>
              <th className="border px-4 py-2 text-left">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {filteredTransactions.map((item) => (
              <tr key={item.id} className="hover:bg-yellow-700">
                <td className="border px-4 py-2">{item.id}</td>
                <td className="border px-4 py-2">
                  <div className="flex items-center">
                    {item.product.imageUrl ? (
                      <img src={item.product.imageUrl} alt={item.product.name} className="h-6 w-6 mr-2 object-cover" />
                    ) : (
                      <div className="bg-red-500 h-6 w-6 mr-2"></div>
                    )}
                    {item.product.name}
                  </div>
                </td>
                <td className="border px-4 py-2">Rp {item.product.price.toLocaleString('id-ID')}</td>
                <td className="border px-4 py-2">{item.quantity}</td>
                <td className="border px-4 py-2">Rp {item.total.toLocaleString('id-ID')}</td>
                <td className="border px-4 py-2">{formatDate(item.createdAt)}</td>
                <td className="border px-4 py-2">
                  <div className="flex space-x-2">
                    <button 
                      className="text-blue-500 hover:text-blue-700"
                      onClick={() => handleEditTransaction(item.id)}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </button>
                    <button 
                      className="text-red-500 hover:text-red-700"
                      onClick={() => handleDeleteTransaction(item.id)}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}