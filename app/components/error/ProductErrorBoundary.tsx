// components/error/ErrorBoundary.tsx
'use client';

import { useEffect } from 'react';

interface ErrorBoundaryProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ProductErrorBoundary({ error, reset }: ErrorBoundaryProps) {
  useEffect(() => {
    // Log error ke layanan analitik atau monitoring
    console.error('Error terjadi:', error);
  }, [error]);

  return (
    <div className="container mx-auto p-4">
      <div className="bg-yellow-500 p-4 rounded-t-sm">
        <h1 className="text-xl font-bold text-white">Daftar Produk</h1>
      </div>
      <div className="mt-5 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
        <h2 className="text-lg font-semibold mb-2">Terjadi Kesalahan</h2>
        <p className="mb-4">Maaf, terjadi kesalahan saat memuat data.</p>
        <button
          onClick={() => reset()}
          className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded"
        >
          Coba Lagi
        </button>
      </div>
    </div>
  );
}