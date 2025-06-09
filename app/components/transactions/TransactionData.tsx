// components/transactions/TransactionData.tsx
import { Suspense } from 'react';
import { Transaction } from '@/types/interfaces';
import TransactionTable from './TransactionTable';
import TransactionTableSkeleton from '../skeleton/TransactionTableSkeleton';

// Fungsi untuk mengambil data dari server
async function getTransactions(): Promise<Transaction[]> {
  try {
    // Mengakses API route langsung melalui import
    const res = await import('@/app/api/transactions/route');
    
    // Akses handler GET dari route file
    const response = await res.GET();
    
    // Parse response JSON
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error saat mengambil data transaksi:', error);
    // Kembalikan array kosong jika terjadi error
    return [];
  }
}

// Component utama untuk data transaksi yang ditampilkan
export default async function TransactionData() {
  // Mengambil data transaksi
  const transactions = await getTransactions();
  
  return <TransactionTable transactions={transactions} />;
}

// Komponen wrapper dengan Suspense untuk lazy loading
export function TransactionDataWithSuspense() {
  return (
    <Suspense fallback={<TransactionTableSkeleton />}>
      <TransactionData />
    </Suspense>
  );
}