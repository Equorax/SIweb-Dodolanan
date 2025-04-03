'use client';

import React, { ButtonHTMLAttributes, useState } from 'react';
import { useRouter } from 'next/navigation';


export default function AddStock() {
  const router = useRouter();
  const [stockId, setStockId] = useState('ST007');
  const [stockName, setStockName] = useState('Mainan 7');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement> ) => {
    e.preventDefault();
    // display untuk balik belum aktif
    router.push('/admin/dashboard');
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
    

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-yellow-500 shadow-md">
          <div className="flex justify-between items-center p-4">
            <h1 className="text-xl font-semibold text-white">Kelola Stok Barang</h1>
            <div className="flex items-center">
              <div className="flex items-center mr-2">
                <div className="h-8 w-8 bg-white rounded-full overflow-hidden mr-2">
                  <img src="/api/placeholder/32/32" alt="Admin" className="h-full w-full object-cover" />
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
              <form onSubmit = {handleSubmit}>
                {/* ID Stok */}
                <div className="mb-6">
                  <label htmlFor="stockId" className="block text-blue-600 font-medium mb-2">
                    ID Stok
                  </label>
                  <input
                    type="text"
                    id="stockId"
                    value={stockId}
                    onChange={(e) => setStockId(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Nama Stok */}
                <div className="mb-8">
                  <label htmlFor="stockName" className="block text-blue-600 font-medium mb-2">
                    Nama Stok
                  </label>
                  <input
                    type="text"
                    id="stockName"
                    value={stockName}
                    onChange={(e) => setStockName(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Submit Button */}
                <div className="flex justify-center">
                  <button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-8 rounded-md"
                  >
                    Konfirmasi
                  </button>
                </div>
              </form>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}