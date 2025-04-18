'use client';

import React, { ButtonHTMLAttributes, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';


export default function AddStock() {
  const router = useRouter();
  const [stockId, setStockId] = useState('');
  const [stockName, setStockName] = useState('');
  const [stockQuant,setStockQuant] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement> ) => {
    e.preventDefault();
    // display untuk balik belum aktif
    router.push('/admin/kelola-stok');
  };

  const cancelSubmit = () =>{
    router.push('admin/kelola-stok')
  }

  const [fileError, setFileError] = useState('');
  const [fileName, setFileName] = useState('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    const maxSizeMB = 5;

    if (file) {
      if (file.size > maxSizeMB * 1024 * 1024) {
        setFileError('File size exceeds 5MB.');
        setFileName('');
        e.target.value = ''; // reset the input
      } else {
        setFileError('');
        setFileName(file.name);
      }
    }
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
                <h1 className='text-3xl mb-3 text-blue-600 font-medium'> Edit Barang </h1>
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

                  {/* Jumlah Stok */}
                  <div className="mb-8">
                  <label htmlFor="stockQuantity" className="block text-blue-600 font-medium mb-2">
                    Jumlah Stok
                  </label>
                      <input
                        type="number"
                        id="stockQuantity"
                        value={stockQuant}
                        onChange={(e) => setStockQuant(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                </div>
                
                {/* {Upload Gambar} */}
              <div className="mb-12">
                <label htmlFor="avatar" className="block text-blue-600 font-medium mb-2">
                  Upload Gambar
                </label>

                <div className="relative">
                  {/* Fake input that looks like a text field */}
                  <div className="w-full px-4 py-2 border-2 border-blue-500 rounded-md bg-white text-gray-500 pointer-events-none">
                    {fileName || "Pilih gambar..."}
                  </div>

                  {/* Real hidden file input that sits on top */}
                  <input
                    type="file"
                    id="avatar"
                    name="avatar"
                    accept="image/png, image/jpeg"
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    onChange={handleFileChange}
                  />
                </div>

                {/* Show selected file name or error below */}
                {fileError && (
                  <p className="mt-2 text-red-600 text-sm">{fileError}</p>
                )}
              </div>


                

                {/* Submit & Cancel Button */}
                <div className='flex justify-center gap-5'>
                <div className="flex justify-center">
                  <button
                    type="submit"
                    className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-8 rounded-md"
                  >
                    Cancel
                  </button>
                </div>

                <div className="flex justify-center">
                  <button
                    onClick={cancelSubmit}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-8 rounded-md"
                  >
                    Konfirmasi
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