//route: app/admin/kelola-stok/tambah-barang/page.tsx

'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { uploadProductImage } from '@/lib/imageUtils';

export default function TambahBarang() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const [fileError, setFileError] = useState('');
  const [fileName, setFileName] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    const maxSizeMB = 5;

    if (file) {
      if (file.size > maxSizeMB * 1024 * 1024) {
        setFileError(`Ukuran file melebihi ${maxSizeMB}MB.`);
        setFileName('');
        setSelectedFile(null);
        e.target.value = ''; // reset the input
      } else {
        setFileError('');
        setFileName(file.name);
        setSelectedFile(file);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Validasi form
    if (!name.trim()) {
      setError('Nama produk harus diisi');
      return;
    }
    
    if (!price || isNaN(Number(price)) || Number(price) <= 0) {
      setError('Harga harus berupa angka positif');
      return;
    }
    
    if (!stock || isNaN(Number(stock)) || Number(stock) < 0) {
      setError('Jumlah stok harus berupa angka non-negatif');
      return;
    }
    
    setIsSubmitting(true);
    setError('');
    // tanpa image try handler
    try {
      // Data produk yang akan dikirim
      const productData = {
        name,
        price: Number(price),
        stock: Number(stock),
        description: description || null,
      };
      
      // Kirim data produk ke API
      const response = await fetch('/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productData),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Gagal menambahkan produk');
      }
      
      const createdProduct = await response.json();
      
      // Jika ada file terpilih, upload file ke server
      if (selectedFile) {
        try {
          await uploadProductImage(createdProduct.id, selectedFile);
        } catch (uploadErr) {
          console.error('Error uploading image:', uploadErr);
          // We don't throw here as the product was created successfully
        }
      }
      
      // Redirect ke halaman kelola stok setelah berhasil
      router.push('/admin/kelola-stok');
      router.refresh();
    } catch (err) {
      console.error('Error adding product:', err);
      setError(err instanceof Error ? err.message : 'Terjadi kesalahan saat menambahkan produk');
    } finally {
      setIsSubmitting(false);
    }
  };

  const cancelSubmit = () => {
    router.push('/admin/kelola-stok');
  };

  return (
    <div className="flex h-screen">
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
              {error && (
                <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4">
                  <p>{error}</p>
                </div>
              )}
              
              <form onSubmit={handleSubmit}>
                <h1 className='text-3xl mb-3 text-blue-600 font-medium'>Tambah Barang</h1>
                
                {/* Nama Produk */}
                <div className="mb-8">
                  <label htmlFor="name" className="block text-blue-600 font-medium mb-2">
                    Nama Mainan
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                {/* Harga */}
                <div className="mb-8">
                  <label htmlFor="price" className="block text-blue-600 font-medium mb-2">
                    Harga
                  </label>
                  <input
                    type="number"
                    id="price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    min="0"
                    required
                  />
                </div>

                {/* Jumlah Stok */}
                <div className="mb-8">
                  <label htmlFor="stock" className="block text-blue-600 font-medium mb-2">
                    Jumlah Stok
                  </label>
                  <input
                    type="number"
                    id="stock"
                    value={stock}
                    onChange={(e) => setStock(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    min="0"
                    required
                  />
                </div>

                {/* Deskripsi */}
                <div className="mb-8">
                  <label htmlFor="description" className="block text-blue-600 font-medium mb-2">
                    Deskripsi (Opsional)
                  </label>
                  <textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows={3}
                  />
                </div>
                
                {/* Upload Gambar */}
                <div className="mb-12">
                  <label htmlFor="avatar" className="block text-blue-600 font-medium mb-2">
                    Upload Gambar (Opsional)
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
                      accept="image/png, image/jpeg, image/gif, image/webp"
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      onChange={handleFileChange}
                    />
                  </div>

                  {/* Show error below */}
                  {fileError && (
                    <p className="mt-2 text-red-600 text-sm">{fileError}</p>
                  )}
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