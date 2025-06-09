// app/admin/dashboard/components/BestSellingProduct.tsx
'use client';

import React from 'react';

interface BestSellingProductProps {
  bestSellingProduct: {
    id: number;
    name: string;
    price: number;
    soldQuantity: number;
  } | null;
}

// Fungsi untuk format mata uang
const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
};

export default function BestSellingProduct({ bestSellingProduct }: BestSellingProductProps) {
  return (
    <div className="bg-white rounded-lg p-4 shadow mb-6">
      <h2 className="text-xl font-semibold mb-4">Produk Paling Laris</h2>
      {bestSellingProduct ? (
        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium text-lg">{bestSellingProduct.name}</p>
            <p>Harga: {formatCurrency(bestSellingProduct.price)}</p>
          </div>
          <div className="bg-yellow-100 p-3 rounded-lg">
            <p className="font-bold">Terjual: {bestSellingProduct.soldQuantity} unit</p>
          </div>
        </div>
      ) : (
        <p>Tidak ada data penjualan</p>
      )}
    </div>
  );
}