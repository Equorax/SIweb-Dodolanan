// app/admin/kelola-transaksi/page.tsx
'use client';

import { useState, useEffect } from 'react';
import Head from 'next/head';
import { Search, Edit2, Trash2, Trash } from 'lucide-react';
import { useRouter } from 'next/navigation';



// Definisikan tipe untuk data
interface Product {
  id: number;
  name: string;
  price: number;
  stock: number;
}

interface Transaction {
  id: number;
  productId: number;
  product: Product;
  quantity: number;
  total: number;
  createdAt: string;
}

export default function TransaksiPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter();

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('/api/transactions');
        if (!response.ok) {
          throw new Error(`Error ${response.status}: ${response.statusText}`);
        }
        
        const data = await response.json();
        console.log('Data transaksi:', data); // Tambahkan log untuk debugging
        setTransactions(data);
      } catch (error) {
        console.error('Error saat mengambil data:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  // Filter transaksi berdasarkan pencarian
  const filteredTransactions = transactions.filter(transaction => 
    transaction.product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Format angka sebagai mata uang
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(amount);
  };

  // Handler Untuk Tambah Transaksi (Fake/palsu)
  const handleAdd = () => {
    router.push('/admin/kelola-transaksi/tambah-transaksi')
  }

  // Handler untuk hapus transaksi
  const handleDelete = async (id: number) => {
    if (!confirm('Apakah Anda yakin ingin menghapus transaksi ini?')) {
      return;
    }

    try {
      const response = await fetch(`/api/transactions/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Gagal menghapus transaksi');
      }

      // Hapus transaksi dari state
      setTransactions(transactions.filter(t => t.id !== id));
      alert('Transaksi berhasil dihapus');
    } catch (error) {
      console.error('Error:', error);
      alert('Gagal menghapus transaksi');
    }
  };

  return (
    <div>
      <Head>
        <title>Kelola Transaksi - DODOLANAN</title>
      </Head>

      <div className="flex">
        {/* Sidebar bisa dimasukkan di sini */}
        
        <div className="flex-1">
          <div className="bg-yellow-500 p-4">
            <h1 className="text-xl font-semibold text-white">Kelola Transaksi</h1>
          </div>

          <div className="p-4">
            <div className="bg-yellow-500 p-4 rounded-lg">
              <div className="flex justify-between mb-4">
                <h2 className="text-lg font-semibold">Transaksi Penjualan</h2>
                {/* input element */}
                <div className="flex space-x-2">
                  <div className='relative'>
                    <input 
                      type="text" 
                      placeholder="Cari Transaksi..." 
                      className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                     <div className="absolute left-3 top-2.5">
                        <Search size={18} className="text-gray-400" />
                      </div>
                  </div>
                 
                  <button className="bg-blue-600 text-white px-3 py-1 rounded"
                  onClick={handleAdd}>
                    Tambah Transaksi
                  </button>
                </div>
              </div>

              {loading ? (
                <p>Memuat data...</p>
              ) : filteredTransactions.length > 0 ? (
                <table className="w-full bg-white rounded overflow-hidden">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="text-left p-2">ID Mainan</th>
                      <th className="text-left p-2">Nama Mainan</th>
                      <th className="text-left p-2">Harga</th>
                      <th className="text-left p-2">Jumlah</th>
                      <th className="text-left p-2">Total Transaksi</th>
                      <th className="text-left p-2">Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* mapping */}
                    {filteredTransactions.map((transaction) => (
                      <tr key={transaction.id} className="border-t">
                        <td className="p-2">{transaction.productId}</td>
                        <td className="p-2">{transaction.product.name}</td>
                        <td className="p-2">{formatCurrency(transaction.product.price)}</td>
                        <td className="p-2">{transaction.quantity}</td>
                        <td className="p-2">{formatCurrency(transaction.total)}</td>
                        <td className="p-2">
                          <button 
                            className="text-blue-500 mr-2"
                            onClick={() => alert(`Edit transaksi ID: ${transaction.id}`)}
                          ><Edit2 size={18}/></button>
                          <button 
                            className="text-red-500"
                            onClick={() => handleDelete(transaction.id)}
                          ><Trash2 size={18}/></button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p className="text-center p-4 bg-white rounded">Tidak ada data transaksi ditemukan.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}