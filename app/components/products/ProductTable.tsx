// // // components/products/ProductTable.tsx
// // 'use client';

// // import { useState } from 'react';
// // import { useRouter } from 'next/navigation';
// // import { Product } from '@/types/interfaces';

// // type ProductTableProps = {
// //   produk: Product[];
// // };

// // export default function ProductTable({ produk }: ProductTableProps) {
// //   const router = useRouter();
// //   const [searchQuery, setSearchQuery] = useState('');
// //   const [failedImages, setFailedImages] = useState<Record<number, boolean>>({});

// //   const handleAddProduct = () => {
// //     router.push('/admin/kelola-stok/tambah-barang');
// //   };

// //   const handleEditProduct = (id: number) => {
// //     router.push(`/admin/kelola-stok/edit-barang?id=${id}`);
// //   };

// //   const handleDeleteProduct = async (id: number) => {
// //     if (window.confirm('Apakah Anda yakin ingin menghapus produk ini?')) {
// //       try {
// //         const response = await fetch(`/api/products/${id}`, {
// //           method: 'DELETE',
// //         });

// //         if (!response.ok) {
// //           const errorData = await response.json();
// //           throw new Error(errorData.error || 'Gagal menghapus produk');
// //         }

// //         // Refresh halaman setelah menghapus
// //         router.refresh();
// //       } catch (err) {
// //         console.error('Error deleting product:', err);
// //         alert(err instanceof Error ? err.message : 'Gagal menghapus produk');
// //       }
// //     }
// //   };

// //   // Filter produk berdasarkan pencarian
// //   const filteredProducts = produk.filter(product => 
// //     product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
// //     product.id.toString().includes(searchQuery)
// //   );

// //   const getImageUrl = (product: Product) => {
// //     // Jika produk memiliki data gambar, gunakan endpoint API gambar
// //     if (product.imageData || (product.imageUrl && product.imageUrl.startsWith('/api/products/'))) {
// //       return `/api/products/${product.id}/image`;
// //     }
// //     // Jika tidak, gunakan URL gambar yang disimpan (jika ada)
// //     return product.imageUrl || null;
// //   };

// //   // Fungsi untuk menandai gambar yang gagal dimuat
// //   const handleImageError = (productId: number) => {
// //     setFailedImages(prev => ({
// //       ...prev,
// //       [productId]: true
// //     }));
// //   };

// //   return (
// //     <div>
// //       <div className="bg-yellow-500 p-5 max-lg:">
// //         <h1 className="text-xl font-semibold text-white">Kelola Stok</h1>
// //       </div>
      
// //       <div className='mt-10 bg-yellow-500 pt-5'>
// //         <div className="flex justify-between items-center">
// //           <h1 className="text-xl font-bold pl-5">Daftar Produk</h1>
// //           <div className="flex space-x-2 mr-5">
// //             <div className="relative">
// //               <input
// //                 type="text"
// //                 placeholder="Cari Produk..."
// //                 className="border rounded-md px-3 py-1 pr-8"
// //                 value={searchQuery}
// //                 onChange={(e) => setSearchQuery(e.target.value)}
// //               />
// //               <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
// //                 <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
// //                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
// //                 </svg>
// //               </div>
// //             </div>
// //             <button 
// //               className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 rounded-md"
// //               onClick={handleAddProduct}
// //             >
// //               Tambah Produk
// //             </button>
// //           </div>
// //         </div>
// //       </div>

// //       <div className="overflow-x-auto">
// //         <table className="min-w-full border-collapse bg-yellow-500">
// //           <thead>
// //             <tr className="bg-yellow-500">
// //               <th className="border px-4 py-2 text-left">ID Mainan</th>
// //               <th className="border px-4 py-2 text-left">Nama Mainan</th>
// //               <th className="border px-4 py-2 text-left">Harga</th>
// //               <th className="border px-4 py-2 text-left">Jumlah</th>
// //               <th className="border px-4 py-2 text-left">Aksi</th>
// //             </tr>
// //           </thead>
// //           <tbody>
// //             {filteredProducts.map((item) => (
// //               <tr key={item.id} className="hover:bg-yellow-700">
// //                 {/* id */}
// //                 <td className="border px-4 py-2">{item.id}</td>
// //                 {/* gambar */}
// //                 <td className="border px-4 py-2">
// //                   <div className="flex items-center">
// //                     {getImageUrl(item) && !failedImages[item.id] ? (
// //                       <img 
// //                         src={getImageUrl(item) || ''} 
// //                         alt={item.name} 
// //                         className="h-6 w-6 mr-2 object-cover" 
// //                         onError={() => handleImageError(item.id)}
// //                       />
// //                     ) : (
// //                       <div className="bg-red-500 h-6 w-6 mr-2"></div>
// //                     )}
// //                     {item.name}
// //                   </div>
// //                 </td>
// //                 {/* harga */}
// //                 <td className="border px-4 py-2">Rp {item.price.toLocaleString('id-ID')}</td>
// //                 {/* stok */}
// //                 <td className="border px-4 py-2">{item.stock}</td>
// //                 {/* tombol hapus edit */}
// //                 <td className="border px-4 py-2">
// //                   <div className="flex space-x-2">
// //                     <button 
// //                       className="text-blue-500 hover:text-blue-700"
// //                       onClick={() => handleEditProduct(item.id)}
// //                     >
// //                       <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
// //                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
// //                       </svg>
// //                     </button>
// //                     <button 
// //                       className="text-red-500 hover:text-red-700"
// //                       onClick={() => handleDeleteProduct(item.id)}
// //                     >
// //                       <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
// //                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
// //                       </svg>
// //                     </button>
// //                   </div>
// //                 </td>
// //               </tr>
// //             ))}
// //           </tbody>
// //         </table>
// //       </div>
// //     </div>
// //   );
// // }


// // components/products/ProductTable.tsx
// 'use client';

// import { useState } from 'react';
// import { useRouter } from 'next/navigation';
// import { Product } from '@/types/interfaces';

// type ProductTableProps = {
//   produk: Product[];
// };

// export default function ProductTable({ produk }: ProductTableProps) {
//   const router = useRouter();
//   const [searchQuery, setSearchQuery] = useState('');
//   const [failedImages, setFailedImages] = useState<Record<number, boolean>>({});
//   const [currentPage, setCurrentPage] = useState(1);
//   const [itemsPerPage, setItemsPerPage] = useState(5);

//   const handleAddProduct = () => {
//     router.push('/admin/kelola-stok/tambah-barang');
//   };

//   const handleEditProduct = (id: number) => {
//     router.push(`/admin/kelola-stok/edit-barang?id=${id}`);
//   };

//   const handleDeleteProduct = async (id: number) => {
//     if (window.confirm('Apakah Anda yakin ingin menghapus produk ini?')) {
//       try {
//         const response = await fetch(`/api/products/${id}`, {
//           method: 'DELETE',
//         });

//         if (!response.ok) {
//           const errorData = await response.json();
//           throw new Error(errorData.error || 'Gagal menghapus produk');
//         }

//         // Refresh halaman setelah menghapus
//         router.refresh();
//       } catch (err) {
//         console.error('Error deleting product:', err);
//         alert(err instanceof Error ? err.message : 'Gagal menghapus produk');
//       }
//     }
//   };

//   // Filter produk berdasarkan pencarian
//   const filteredProducts = produk.filter(product => 
//     product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//     product.id.toString().includes(searchQuery)
//   );

//   // Pagination calculations
//   const totalProducts = filteredProducts.length;
//   const totalPages = Math.ceil(totalProducts / itemsPerPage);
//   const startIndex = (currentPage - 1) * itemsPerPage;
//   const endIndex = startIndex + itemsPerPage;
//   const currentProducts = filteredProducts.slice(startIndex, endIndex);

//   // Handle page size change
//   const handleItemsPerPageChange = (newItemsPerPage: number) => {
//     setItemsPerPage(newItemsPerPage);
//     setCurrentPage(1); // Reset to first page when changing items per page
//   };

//   // Handle page navigation
//   const goToPage = (page: number) => {
//     setCurrentPage(page);
//   };

//   const goToPreviousPage = () => {
//     if (currentPage > 1) {
//       setCurrentPage(currentPage - 1);
//     }
//   };

//   const goToNextPage = () => {
//     if (currentPage < totalPages) {
//       setCurrentPage(currentPage + 1);
//     }
//   };

//   // Generate page numbers for pagination
//   const getPageNumbers = () => {
//     const pageNumbers = [];
//     const maxVisiblePages = 5;
    
//     if (totalPages <= maxVisiblePages) {
//       for (let i = 1; i <= totalPages; i++) {
//         pageNumbers.push(i);
//       }
//     } else {
//       const startPage = Math.max(1, currentPage - 2);
//       const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
      
//       for (let i = startPage; i <= endPage; i++) {
//         pageNumbers.push(i);
//       }
//     }
    
//     return pageNumbers;
//   };

//   // Reset to first page when search query changes
//   const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setSearchQuery(e.target.value);
//     setCurrentPage(1);
//   };

//   const getImageUrl = (product: Product) => {
//     // Jika produk memiliki data gambar, gunakan endpoint API gambar
//     if (product.imageData || (product.imageUrl && product.imageUrl.startsWith('/api/products/'))) {
//       return `/api/products/${product.id}/image`;
//     }
//     // Jika tidak, gunakan URL gambar yang disimpan (jika ada)
//     return product.imageUrl || null;
//   };

//   // Fungsi untuk menandai gambar yang gagal dimuat
//   const handleImageError = (productId: number) => {
//     setFailedImages(prev => ({
//       ...prev,
//       [productId]: true
//     }));
//   };

//   return (
//     <div>
//       <div className="bg-yellow-500 p-5 max-lg:">
//         <h1 className="text-xl font-semibold text-white">Kelola Stok</h1>
//       </div>
      
//       <div className='mt-10 bg-yellow-500 pt-5'>
//         <div className="flex justify-between items-center">
//           <h1 className="text-xl font-bold pl-5">Daftar Produk</h1>
//           <div className="flex space-x-2 mr-5">
//             <div className="relative">
//               <input
//                 type="text"
//                 placeholder="Cari Produk..."
//                 className="border rounded-md px-3 py-1 pr-8"
//                 value={searchQuery}
//                 onChange={handleSearchChange}
//               />
//               <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
//                 <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
//                 </svg>
//               </div>
//             </div>
//             <button 
//               className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 rounded-md"
//               onClick={handleAddProduct}
//             >
//               Tambah Produk
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Pagination Controls - Top */}
//       {totalProducts > 0 && (
//         <div className="bg-yellow-400 p-4 border-b">
//           <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
//             <div className="flex items-center gap-4">
//               <span className="text-gray-800 font-medium">Produk per halaman:</span>
//               <div className="flex gap-2">
//                 <button
//                   onClick={() => handleItemsPerPageChange(5)}
//                   className={`px-3 py-1 rounded-md font-medium transition-colors ${
//                     itemsPerPage === 5
//                       ? 'bg-blue-600 text-white'
//                       : 'bg-white text-gray-700 hover:bg-gray-100 border'
//                   }`}
//                 >
//                   5
//                 </button>
//                 <button
//                   onClick={() => handleItemsPerPageChange(10)}
//                   className={`px-3 py-1 rounded-md font-medium transition-colors ${
//                     itemsPerPage === 10
//                       ? 'bg-blue-600 text-white'
//                       : 'bg-white text-gray-700 hover:bg-gray-100 border'
//                   }`}
//                 >
//                   10
//                 </button>
//               </div>
//             </div>
            
//             <div className="text-gray-800 font-medium">
//               Produk {totalProducts === 0 ? 0 : startIndex + 1}-{Math.min(endIndex, totalProducts)} dari {totalProducts} Produk
//             </div>
//           </div>
//         </div>
//       )}

//       <div className="overflow-x-auto">
//         <table className="min-w-full border-collapse bg-yellow-500">
//           <thead>
//             <tr className="bg-yellow-500">
//               <th className="border px-4 py-2 text-left">ID Mainan</th>
//               <th className="border px-4 py-2 text-left">Nama Mainan</th>
//               <th className="border px-4 py-2 text-left">Harga</th>
//               <th className="border px-4 py-2 text-left">Jumlah</th>
//               <th className="border px-4 py-2 text-left">Aksi</th>
//             </tr>
//           </thead>
//           <tbody>
//             {currentProducts.length === 0 ? (
//               <tr>
//                 <td colSpan={5} className="border px-4 py-8 text-center text-gray-600">
//                   {searchQuery ? 'Tidak ada produk yang sesuai dengan pencarian.' : 'Tidak ada produk yang tersedia.'}
//                 </td>
//               </tr>
//             ) : (
//               currentProducts.map((item) => (
//                 <tr key={item.id} className="hover:bg-yellow-700">
//                   {/* id */}
//                   <td className="border px-4 py-2">{item.id}</td>
//                   {/* gambar */}
//                   <td className="border px-4 py-2">
//                     <div className="flex items-center">
//                       {getImageUrl(item) && !failedImages[item.id] ? (
//                         <img 
//                           src={getImageUrl(item) || ''} 
//                           alt={item.name} 
//                           className="h-6 w-6 mr-2 object-cover" 
//                           onError={() => handleImageError(item.id)}
//                         />
//                       ) : (
//                         <div className="bg-red-500 h-6 w-6 mr-2"></div>
//                       )}
//                       {item.name}
//                     </div>
//                   </td>
//                   {/* harga */}
//                   <td className="border px-4 py-2">Rp {item.price.toLocaleString('id-ID')}</td>
//                   {/* stok */}
//                   <td className="border px-4 py-2">{item.stock}</td>
//                   {/* tombol hapus edit */}
//                   <td className="border px-4 py-2">
//                     <div className="flex space-x-2">
//                       <button 
//                         className="text-blue-500 hover:text-blue-700"
//                         onClick={() => handleEditProduct(item.id)}
//                       >
//                         <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
//                         </svg>
//                       </button>
//                       <button 
//                         className="text-red-500 hover:text-red-700"
//                         onClick={() => handleDeleteProduct(item.id)}
//                       >
//                         <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
//                         </svg>
//                       </button>
//                     </div>
//                   </td>
//                 </tr>
//               ))
//             )}
//           </tbody>
//         </table>
//       </div>

//       {/* Pagination Controls - Bottom */}
//       {totalPages > 1 && (
//         <div className="bg-yellow-400 p-4 border-t">
//           <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
//             {/* Page Info */}
//             <div className="text-gray-800 font-medium">
//               halaman {currentPage} dari {totalPages}
//             </div>
            
//             {/* Navigation Buttons */}
//             <div className="flex items-center gap-2">
//               {/* Previous Button */}
//               <button
//                 onClick={goToPreviousPage}
//                 disabled={currentPage === 1}
//                 className={`px-3 py-2 rounded-md font-medium transition-colors ${
//                   currentPage === 1
//                     ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
//                     : 'bg-blue-600 text-white hover:bg-blue-700'
//                 }`}
//               >
//                 Previous
//               </button>

//               {/* Page Numbers */}
//               <div className="flex gap-1">
//                 {getPageNumbers().map((pageNumber) => (
//                   <button
//                     key={pageNumber}
//                     onClick={() => goToPage(pageNumber)}
//                     className={`px-3 py-2 rounded-md font-medium transition-colors ${
//                       currentPage === pageNumber
//                         ? 'bg-blue-600 text-white'
//                         : 'bg-white text-gray-700 hover:bg-gray-100 border'
//                     }`}
//                   >
//                     {pageNumber}
//                   </button>
//                 ))}
//               </div>

//               {/* Next Button */}
//               <button
//                 onClick={goToNextPage}
//                 disabled={currentPage === totalPages}
//                 className={`px-3 py-2 rounded-md font-medium transition-colors ${
//                   currentPage === totalPages
//                     ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
//                     : 'bg-blue-600 text-white hover:bg-blue-700'
//                 }`}
//               >
//                 Next
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }


// components/products/ProductTable.tsx
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Product } from '@/types/interfaces';

type ProductTableProps = {
  produk: Product[];
};

export default function ProductTable({ produk: initialProduk }: ProductTableProps) {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [failedImages, setFailedImages] = useState<Record<number, boolean>>({});
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  
  // STATE UNTUK REAL-TIME DATA
  const [products, setProducts] = useState<Product[]>(initialProduk);
  const [isLoading, setIsLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());

  // UPDATE PRODUCTS KETIKA PROPS BERUBAH
  useEffect(() => {
    setProducts(initialProduk);
    setLastUpdated(new Date());
  }, [initialProduk]);

  // AUTO REFRESH SETIAP 30 DETIK (OPTIONAL)
  useEffect(() => {
    const interval = setInterval(() => {
      fetchProducts();
    }, 30000); // 30 seconds

    return () => clearInterval(interval);
  }, []);

  // FUNGSI UNTUK FETCH PRODUCTS REAL-TIME
  const fetchProducts = async () => {
    setIsLoading(true);
    try {
      // TAMBAHKAN TIMESTAMP UNTUK BYPASS CACHE
      const timestamp = new Date().getTime();
      const response = await fetch(`/api/products?_t=${timestamp}`, {
        cache: 'no-store',
        headers: {
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Pragma': 'no-cache',
          'Expires': '0'
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        setProducts(data);
        setLastUpdated(new Date());
        console.log('Data refreshed at:', new Date().toLocaleTimeString());
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // FORCE REFRESH SELURUH HALAMAN
  const forceRefreshPage = () => {
    window.location.reload();
  };

  const handleAddProduct = () => {
    router.push('/admin/kelola-stok/tambah-barang');
  };

  const handleEditProduct = (id: number) => {
    router.push(`/admin/kelola-stok/edit-barang?id=${id}`);
  };

  const handleDeleteProduct = async (id: number) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus produk ini?')) {
      try {
        const response = await fetch(`/api/products/${id}`, {
          method: 'DELETE',
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Gagal menghapus produk');
        }

        // REFRESH DATA SETELAH DELETE
        await fetchProducts();
        
        // JUGA REFRESH ROUTER
        router.refresh();
        
        alert('Produk berhasil dihapus!');
      } catch (err) {
        console.error('Error deleting product:', err);
        alert(err instanceof Error ? err.message : 'Gagal menghapus produk');
      }
    }
  };

  // HANDLE REFRESH BUTTON
  const handleRefresh = async () => {
    await fetchProducts();
  };

  // Filter produk berdasarkan pencarian
  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.id.toString().includes(searchQuery)
  );

  // Pagination calculations
  const totalProducts = filteredProducts.length;
  const totalPages = Math.ceil(totalProducts / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProducts = filteredProducts.slice(startIndex, endIndex);

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

  const getImageUrl = (product: Product) => {
    if (product.imageData || (product.imageUrl && product.imageUrl.startsWith('/api/products/'))) {
      return `/api/products/${product.id}/image`;
    }
    return product.imageUrl || null;
  };

  const handleImageError = (productId: number) => {
    setFailedImages(prev => ({
      ...prev,
      [productId]: true
    }));
  };

  return (
    <div>
      <div className="bg-yellow-500 p-5 max-lg:">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-semibold text-white">Kelola Stok</h1>
          {/* TAMBAHKAN LAST UPDATED INFO */}
          <div className="text-white text-sm">
            Last updated: {lastUpdated.toLocaleTimeString('id-ID')}
          </div>
        </div>
      </div>
      
      <div className='mt-10 bg-yellow-500 pt-5'>
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-bold pl-5">Daftar Produk</h1>
          <div className="flex space-x-2 mr-5">
            <div className="relative">
              <input
                type="text"
                placeholder="Cari Produk..."
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
              onClick={handleAddProduct}
            >
              Tambah Produk
            </button>
          </div>
        </div>
      </div>

      {/* STATUS INDICATOR */}
      <div className="bg-yellow-500 px-5 py-2 text-sm text-black">
        Total produk: {totalProducts} | 
        Status: {isLoading ? '🔄 Memuat...' : '✅ Terbaru'} |
        Auto-refresh setiap 30 detik
      </div>

      {/* Pagination Controls - Top */}
      {totalProducts > 0 && (
        <div className="bg-yellow-400 p-4 border-b">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-4">
              <span className="text-gray-800 font-medium">Produk per halaman:</span>
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
              Produk {totalProducts === 0 ? 0 : startIndex + 1}-{Math.min(endIndex, totalProducts)} dari {totalProducts} Produk
            </div>
          </div>
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse bg-yellow-500">
          <thead>
            <tr className="bg-yellow-500">
              <th className="border px-4 py-2 text-left">ID Mainan</th>
              <th className="border px-4 py-2 text-left">Nama Mainan</th>
              <th className="border px-4 py-2 text-left">Harga</th>
              <th className="border px-4 py-2 text-left">Jumlah</th>
              <th className="border px-4 py-2 text-left">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {currentProducts.length === 0 ? (
              <tr>
                <td colSpan={5} className="border px-4 py-8 text-center text-gray-600">
                  {isLoading ? (
                    <div className="flex items-center justify-center gap-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-600"></div>
                      Memuat data...
                    </div>
                  ) : searchQuery ? (
                    'Tidak ada produk yang sesuai dengan pencarian.'
                  ) : (
                    'Tidak ada produk yang tersedia.'
                  )}
                </td>
              </tr>
            ) : (
              currentProducts.map((item) => (
                <tr key={item.id} className="hover:bg-yellow-700">
                  <td className="border px-4 py-2">{item.id}</td>
                  <td className="border px-4 py-2">
                    <div className="flex items-center">
                      {getImageUrl(item) && !failedImages[item.id] ? (
                        <img 
                          src={getImageUrl(item) || ''} 
                          alt={item.name} 
                          className="h-6 w-6 mr-2 object-cover" 
                          onError={() => handleImageError(item.id)}
                        />
                      ) : (
                        <div className="bg-red-500 h-6 w-6 mr-2"></div>
                      )}
                      {item.name}
                    </div>
                  </td>
                  <td className="border px-4 py-2">Rp {item.price.toLocaleString('id-ID')}</td>
                  <td className="border px-4 py-2">{item.stock}</td>
                  <td className="border px-4 py-2">
                    <div className="flex space-x-2">
                      <button 
                        className="text-blue-500 hover:text-blue-700"
                        onClick={() => handleEditProduct(item.id)}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </button>
                      <button 
                        className="text-red-500 hover:text-red-700"
                        onClick={() => handleDeleteProduct(item.id)}
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
            <div className="text-gray-800 font-medium">
              halaman {currentPage} dari {totalPages}
            </div>
            
            <div className="flex items-center gap-2">
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