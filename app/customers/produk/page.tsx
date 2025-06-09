// // // route: app/customers/produk/page.tsx








'use client';

import React, { useEffect, useState } from 'react';
import { Bungee_Inline } from 'next/font/google';
import Link from 'next/link';
import Image from 'next/image';

const Bungee = Bungee_Inline({
  subsets: ['latin'],
  weight: '400'
});

// Definisikan tipe data untuk produk
interface Product {
  id: number;
  name: string;
  price: number;
  stock: number;
  description: string | null;
  imageUrl: string | null;
  createdAt: string;
  updatedAt: string;
}

export default function ProdukPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

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
        setError('Terjadi kesalahan saat mengambil data produk');
        console.error('Error fetching products:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Calculate pagination values
  const totalProducts = products.length;
  const totalPages = Math.ceil(totalProducts / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProducts = products.slice(startIndex, endIndex);

  // Handle page size change
  const handleItemsPerPageChange = (newItemsPerPage: number) => {
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1); // Reset to first page when changing items per page
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

  return (
    <>
      <section className='flex flex-col items-center min-h-screen bg-yellow-500'>
        <div className='flex-col justify-center items-center'>
          <h1 className={`text-6xl lg:text-9xl mb-5 mt-10 font-bold text-blue-700 text-center ${Bungee.className}`}>PRODUK</h1>
          <hr className='border-4 border-white mt-2' />
        </div>

        {loading ? (
          <div className="flex justify-center items-center min-h-[400px]">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-700"></div>
          </div>
        ) : error ? (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded my-4">
            <p>{error}</p>
          </div>
        ) : (
          <>
            {/* Pagination Controls - Top */}
            {totalProducts > 0 && (
              <div className="bg-white rounded-lg shadow-lg p-4 my-6 w-full max-w-7xl mx-2">
                <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                  <div className="flex items-center gap-4">
                    <span className="text-gray-700 font-medium">Produk per-halaman:</span>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleItemsPerPageChange(5)}
                        className={`px-4 py-2 rounded-md font-medium transition-colors ${
                          itemsPerPage === 5
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                        }`}
                      >
                        5
                      </button>
                      <button
                        onClick={() => handleItemsPerPageChange(10)}
                        className={`px-4 py-2 rounded-md font-medium transition-colors ${
                          itemsPerPage === 10
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                        }`}
                      >
                        10
                      </button>
                    </div>
                  </div>
                  
                  <div className="text-gray-600">
                    Produk {startIndex + 1}-{Math.min(endIndex, totalProducts)} dari  {totalProducts} 
                  </div>
                </div>
              </div>
            )}

            {/* Products Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 my-8 w-full max-w-7xl px-2">
              {totalProducts === 0 ? (
                <div className="col-span-full text-center py-10">
                  <p className="text-xl">Tidak ada produk yang tersedia saat ini.</p>
                </div>
              ) : (
                currentProducts.map((product) => (
                  <Link
                    href={`/customers/produk/${product.id}`}
                    key={product.id}
                    className="bg-white rounded-lg overflow-hidden shadow-lg transform transition-transform hover:scale-105"
                  >
                    <div className="p-4">
                      <div className="relative w-full h-48">
                        {product.imageUrl ? (
                          <Image
                            src={product.imageUrl}
                            alt={product.name}
                            className="object-contain"
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 20vw"
                          />
                        ) : (
                          <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                            <p className="text-gray-500">Tidak ada gambar</p>
                          </div>
                        )}
                      </div>
                      <h2 className="text-xl font-semibold mt-2 text-center">{product.name}</h2>
                    </div>
                  </Link>
                ))
              )}
            </div>

            {/* Pagination Controls - Bottom */}
            {totalPages > 1 && (
              <div className="bg-white rounded-lg shadow-lg p-4 mb-8 w-full max-w-7xl mx-2">
                <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                  {/* Page Info */}
                  <div className="text-gray-600">
                    Page {currentPage} of {totalPages}
                  </div>
                  
                  {/* Navigation Buttons */}
                  <div className="flex items-center gap-2">
                    {/* Previous Button */}
                    <button
                      onClick={goToPreviousPage}
                      disabled={currentPage === 1}
                      className={`px-3 py-2 rounded-md font-medium transition-colors ${
                        currentPage === 1
                          ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
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
                              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
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
                          ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                          : 'bg-blue-600 text-white hover:bg-blue-700'
                      }`}
                    >
                      Next
                    </button>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </section>
    </>
  );
}