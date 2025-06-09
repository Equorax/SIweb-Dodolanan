

// // components/transactions/TransactionTable.tsx


'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Transaction } from '@/types/interfaces';

type TransactionTableProps = {
  transactions: Transaction[];
};

export default function TransactionTable({ transactions: initialTransactions }: TransactionTableProps) {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  
  // STATE UNTUK REAL-TIME DATA
  const [transactions, setTransactions] = useState<Transaction[]>(initialTransactions);
  const [isLoading, setIsLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());

  // UPDATE TRANSACTIONS KETIKA PROPS BERUBAH
  useEffect(() => {
    setTransactions(initialTransactions);
    setLastUpdated(new Date());
  }, [initialTransactions]);

  // AUTO REFRESH SETIAP 30 DETIK (OPTIONAL)
  useEffect(() => {
    const interval = setInterval(() => {
      fetchTransactions();
    }, 30000); // 30 seconds

    return () => clearInterval(interval);
  }, []);

  // FUNGSI UNTUK FETCH TRANSACTIONS REAL-TIME
  const fetchTransactions = async () => {
    setIsLoading(true);
    try {
      // TAMBAHKAN TIMESTAMP UNTUK BYPASS CACHE
      const timestamp = new Date().getTime();
      const response = await fetch(`/api/transactions?_t=${timestamp}`, {
        cache: 'no-store',
        headers: {
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Pragma': 'no-cache',
          'Expires': '0'
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        setTransactions(data);
        setLastUpdated(new Date());
        console.log('Transaction data refreshed at:', new Date().toLocaleTimeString());
      }
    } catch (error) {
      console.error('Error fetching transactions:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // FORCE REFRESH SELURUH HALAMAN
  const forceRefreshPage = () => {
    window.location.reload();
  };

  const handleAddTransaction = () => {
    router.push('/admin/kelola-transaksi/tambah-transaksi');
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

        // REFRESH DATA SETELAH DELETE
        await fetchTransactions();
        
        // JUGA REFRESH ROUTER
        router.refresh();
        
        alert('Transaksi berhasil dihapus!');
      } catch (err) {
        console.error('Error deleting transaction:', err);
        alert(err instanceof Error ? err.message : 'Gagal menghapus transaksi');
      }
    }
  };

  // HANDLE REFRESH BUTTON
  const handleRefresh = async () => {
    await fetchTransactions();
  };

  // Filter transactions based on search query
  const filteredTransactions = transactions.filter(transaction => 
    transaction.product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    transaction.id.toString().includes(searchQuery) ||
    transaction.productId.toString().includes(searchQuery)
  );

  // Pagination calculations
  const totalTransactions = filteredTransactions.length;
  const totalPages = Math.ceil(totalTransactions / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentTransactions = filteredTransactions.slice(startIndex, endIndex);

  // Handle page size change
  const handleItemsPerPageChange = (newItemsPerPage: number) => {
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1);
  };

  // Handle page navigation
  const goToPage = (page: number) => {
    setCurrentPage(page);
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Generate page numbers for pagination
  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxVisiblePages = 5;
    
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      const startPage = Math.max(1, currentPage - 2);
      const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
      
      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
      }
    }
    
    return pageNumbers;
  };

  // Reset to first page when search query changes
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

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

  return (
    <div>
      <div className="bg-yellow-500 p-5">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-semibold text-white">Kelola Transaksi</h1>
          {/* TAMBAHKAN LAST UPDATED INFO */}
          <div className="text-white text-sm">
            Last updated: {lastUpdated.toLocaleTimeString('id-ID')}
          </div>
        </div>
      </div>
      
      <div className='mt-10 bg-yellow-500 pt-5'>
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-bold pl-5">Daftar Transaksi</h1>
          <div className="flex space-x-2 mr-5">
            <div className="relative">
              <input
                type="text"
                placeholder="Cari Transaksi..."
                className="border rounded-md px-3 py-1 pr-8"
                value={searchQuery}
                onChange={handleSearchChange}
              />
              <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>

            {/* REFRESH DATA BUTTON */}
            <button 
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-1 rounded-md flex items-center gap-1"
              onClick={handleRefresh}
              disabled={isLoading}
            >
              <svg className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              {isLoading ? 'Loading...' : 'Refresh'}
            </button>

            {/* FORCE REFRESH PAGE BUTTON */}
            <button 
              className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-1 rounded-md"
              onClick={forceRefreshPage}
              title="Force refresh seluruh halaman"
            >
              ↻ Force
            </button>
        
            <button 
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 rounded-md"
              onClick={handleAddTransaction}
            >
              Tambah Transaksi
            </button>
          </div>
        </div>
      </div>

      {/* STATUS INDICATOR */}
      <div className="bg-yellow-500 px-5 py-2 text-sm text-black">
        Total transaksi: {totalTransactions} | 
        Status: {isLoading ? '🔄 Memuat...' : '✅ Terbaru'} |
        Auto-refresh setiap 30 detik
      </div>

      {/* Pagination Controls - Top */}
      {totalTransactions > 0 && (
        <div className="bg-yellow-400 p-4 border-b">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-4">
              <span className="text-gray-800 font-medium">Transaksi per halaman:</span>
              <div className="flex gap-2">
                <button
                  onClick={() => handleItemsPerPageChange(5)}
                  className={`px-3 py-1 rounded-md font-medium transition-colors ${
                    itemsPerPage === 5
                      ? 'bg-blue-600 text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-100 border'
                  }`}
                >
                  5
                </button>
                <button
                  onClick={() => handleItemsPerPageChange(10)}
                  className={`px-3 py-1 rounded-md font-medium transition-colors ${
                    itemsPerPage === 10
                      ? 'bg-blue-600 text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-100 border'
                  }`}
                >
                  10
                </button>
              </div>
            </div>
            
            <div className="text-gray-800 font-medium">
              Transaksi {totalTransactions === 0 ? 0 : startIndex + 1}-{Math.min(endIndex, totalTransactions)} dari {totalTransactions} transaksi
            </div>
          </div>
        </div>
      )}

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
            {currentTransactions.length === 0 ? (
              <tr>
                <td colSpan={7} className="border px-4 py-8 text-center text-gray-600">
                  {isLoading ? (
                    <div className="flex items-center justify-center gap-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-600"></div>
                      Memuat data...
                    </div>
                  ) : searchQuery ? (
                    'Tidak ada transaksi yang sesuai dengan pencarian.'
                  ) : (
                    'Tidak ada transaksi yang tersedia.'
                  )}
                </td>
              </tr>
            ) : (
              currentTransactions.map((item) => (
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
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls - Bottom */}
      {totalPages > 1 && (
        <div className="bg-yellow-400 p-4 border-t">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            {/* Page Info */}
            <div className="text-gray-800 font-medium">
              Halaman {currentPage} dari {totalPages}
            </div>
            
            {/* Navigation Buttons */}
            <div className="flex items-center gap-2">
              {/* Previous Button */}
              <button
                onClick={goToPreviousPage}
                disabled={currentPage === 1}
                className={`px-3 py-2 rounded-md font-medium transition-colors ${
                  currentPage === 1
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
              >
                Previous
              </button>

              {/* Page Numbers */}
              <div className="flex gap-1">
                {getPageNumbers().map((pageNumber) => (
                  <button
                    key={pageNumber}
                    onClick={() => goToPage(pageNumber)}
                    className={`px-3 py-2 rounded-md font-medium transition-colors ${
                      currentPage === pageNumber
                        ? 'bg-blue-600 text-white'
                        : 'bg-white text-gray-700 hover:bg-gray-100 border'
                    }`}
                  >
                    {pageNumber}
                  </button>
                ))}
              </div>

              {/* Next Button */}
              <button
                onClick={goToNextPage}
                disabled={currentPage === totalPages}
                className={`px-3 py-2 rounded-md font-medium transition-colors ${
                  currentPage === totalPages
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}