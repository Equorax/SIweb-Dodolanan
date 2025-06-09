'use client';

import React from 'react';

interface DataCardsProps {
  totalRevenue: number;
  totalProducts: number;
  totalStock: number;
  totalTransactions: number;
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

export default function DataCards({ totalRevenue, totalProducts, totalStock, totalTransactions }: DataCardsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      {/* Income Card */}
      <div className="bg-yellow-400 rounded-lg p-4 shadow flex justify-between items-center">
        <div>
          <p className="text-xs text-yellow-800">Pendapatan</p>
          <p className="text-lg font-bold text-white">
            {formatCurrency(totalRevenue)}
          </p>
        </div>
        <div className="bg-yellow-300 p-2 rounded-full">
          <span className="text-yellow-700 text-xl">+</span>
        </div>
      </div>
      
      {/* Total Products Card */}
      <div className="bg-yellow-400 rounded-lg p-4 shadow flex justify-between items-center">
        <div>
          <p className="text-xs text-yellow-800">Total Produk</p>
          <p className="text-lg font-bold text-white">
            {totalProducts}
          </p>
          <p className="text-xs text-yellow-800">
            Stok Tersedia: {totalStock}
          </p>
        </div>
        <div className="bg-yellow-300 p-2 rounded-full">
          <span className="text-yellow-700 text-xl">📦</span>
        </div>
      </div>
      
      {/* Total Transaction Card */}
      <div className="bg-yellow-400 rounded-lg p-4 shadow flex justify-between items-center">
        <div>
          <p className="text-xs text-yellow-800">Total Transaksi</p>
          <p className="text-lg font-bold text-white">
            {totalTransactions}
          </p>
        </div>
        <div className="bg-yellow-300 p-2 rounded-full">
          <span className="text-yellow-700 text-xl">🛒</span>
        </div>
      </div>
    </div>
  );
}