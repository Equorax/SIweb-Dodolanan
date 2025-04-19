// pages/index.js
'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Search, Edit2, Trash2 } from 'lucide-react';

export default function kelolaBarang() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [inventory, setInventory] = useState([
    { id: 'ST001', name: 'Mainan 1', quantity: 12,harga:150000, image: null },
    { id: 'ST002', name: 'Mainan 2', quantity: 12,harga:90000, image: null },
    { id: 'ST003', name: 'Mainan 3', quantity: 12,harga:75000, image: null },
    { id: 'ST004', name: 'Mainan 4', quantity: 12,harga:50000, image: null },
    { id: 'ST005', name: 'Mainan 5', quantity: 12,harga:120000, image: null },
    { id: 'ST006', name: 'Mainan 6', quantity: 12,harga:60000, image: null },
  ]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const filteredInventory = inventory.filter(item => 
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDelete = (id:string) => {
    if (confirm('Are you sure you want to delete this item?')) {
      setInventory(inventory.filter(item => item.id !== id));
    }
  };

  const handleAddStock = () => {
    router.push('/admin/kelola-stok/tambah-barang');
  };

  return (
    <div className="flex h-screen bg-gray-100">
    

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-yellow-500 shadow-md">
          <div className="flex justify-between items-center p-4">
            <h1 className="text-xl font-semibold text-white">Kelola Stok Barang</h1>
            <div className="flex items-center">
              <div className="h-8 w-8 bg-white rounded-full overflow-hidden mr-2">
                  <Image src="/assets/Atmin.jpg" alt="Admin" className="h-full w-full object-cover" 
                  width={20}
                  height={20}/>
              </div>
              <span className="text-white text-sm">Admin</span>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-yellow-50 p-4">
          <div className="bg-yellow-500 rounded-lg shadow-md p-6">

            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold text-blue-600">Stok Barang</h2>
              <div className="flex items-center space-x-2">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={handleSearch}
                    className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <div className="absolute left-3 top-2.5">
                    <Search size={18} className="text-gray-400" />
                  </div>
                </div>

                <button
                  onClick={handleAddStock}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
                >
                  Tambah Stok
                </button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  {/* table row */}
                  <tr className="border-b border-gray-200 text-blue-600"> 
                    <th className="px-6 py-3 text-left font-semibold w-1/6">ID Stok</th>
                    <th className="px-6 py-3 text-left font-semibold w-1/6"></th>
                    <th className="px-6 py-3 text-left font-semibold w-1/4">Nama Stok</th>
                    <th className="px-6 py-3 text-left font-semibold w-1/4">Jumlah Stok</th>
                    <th className="px-6 py-3 text-left font-semibold w-1/4">Harga</th>
                    {/* <th className="px-6 py-3 text-center font-semibold w-1/6">Actions</th> */}
                  </tr>
                </thead>
                <tbody>
                  
                  {filteredInventory.map((item) => (

                    <tr key={item.id} className="border-b border-gray-200">
                      {/* id stok */}
                      <td className="px-6 py-4 text-blue-600 font-medium">{item.id}</td>
                      
                      <td className="px-6 py-4">
                        {item.image ? (
                          <div className="h-12 w-12 bg-gray-200 rounded overflow-hidden">
                            <Image src={item.image} alt={item.name} className="h-full w-full object-cover" />
                          </div>
                        ) : (
                          <div className="h-12 w-12 bg-gray-200 rounded flex items-center justify-center">
                            <span className="text-xs text-gray-500">Image</span>
                          </div>
                        )}
                      </td>

                      <td className="px-6 py-4 text-blue-600">{item.name}</td>
                      
                      <td className="pl-[64px] py-4 text-black"> {item.quantity} </td>

                      <td className="pl-[25px] py-4 text-black"> {item.harga} </td>

                      <td className="px-6 py-4 text-center">
                        <div className="flex justify-center space-x-2">
                          <Link href={'/admin//kelola-stok/edit-barang'} className="text-blue-500 hover:text-blue-700">
                            <Edit2 size={18} />
                          </Link>
                          <button
                            onClick={() => handleDelete(item.id)} 
                            className="text-red-500 hover:text-red-700"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}