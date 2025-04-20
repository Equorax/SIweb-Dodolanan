'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';


export default function AddStock() {
  const router = useRouter();
  const [transactionId, setTransactionId] = useState('');
  const [transactionName, setTransactionName] = useState('');
  const [transactionQuant,setTransactionQuant] = useState('');
  const [transactionPrice,setTransactionPrice] = useState('');
  const handleSubmit = (e: React.FormEvent<HTMLFormElement> ) => {
    e.preventDefault();
    // display untuk balik belum aktif
    router.push('/admin/kelola-transaksi');
  };

  const cancelSubmit = () =>{
    router.push('admin/kelola-transaksi')
  }


 

return (
    <div className="flex h-screen">
      {/* Sidebar */}
    

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-yellow-500 shadow-md">
          <div className="flex justify-between items-center p-4">
            <h1 className="text-xl font-semibold text-white">Kelola Transaksi </h1>
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
              <form onSubmit = {handleSubmit}>
                <h1 className='text-3xl mb-3 text-blue-600 font-medium'> Edit  </h1>
                {/* ID Transaksi */}
                <div className="mb-6">
                  <label htmlFor="transactionId" className="block text-blue-600 font-medium mb-2">
                    ID Transaksi
                  </label>
                  <input
                    type="text"
                    id="transactionId"
                    value={transactionId}
                    onChange={(e) => setTransactionId(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Nama Transaksi */}
                <div className="mb-8">
                  <label htmlFor="transactionName" className="block text-blue-600 font-medium mb-2">
                    Nama Transaksi
                  </label>
                      <input
                        type="text"
                        id="transactionName"
                        value={transactionName}
                        onChange={(e) => setTransactionName(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                </div>

                  {/* Jumlah Transaksi */}
                  <div className="mb-8">
                  <label htmlFor="stockQuantity" className="block text-blue-600 font-medium mb-2">
                    Jumlah Transaksi
                  </label>
                      <input
                        type="number"
                        id="stockQuantity"
                        value={transactionQuant}
                        onChange={(e) => setTransactionQuant(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                </div>
                
                {/* harga */}
                <div className="mb-8">
                  <label htmlFor="harga" className="block text-blue-600 font-medium mb-2">
                    Harga 
                  </label>
                      <input
                        type="number"
                        id="harga"
                        value={transactionPrice}
                        onChange={(e) => setTransactionPrice(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                </div>
             


                

                {/* Submit & Cancel Button */}
                <div className='flex justify-center gap-5'>
                <div className="flex justify-center">
                  <button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-8 rounded-md"
                  >
                    Konfirmasi
                  </button>
                </div>

                <div className="flex justify-center">
                  <button
                    onClick={cancelSubmit}
                    className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-8 rounded-md"
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