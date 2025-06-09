// // components/transactions/TransactionData.tsx


import { Suspense } from 'react';
import { Transaction } from '@/types/interfaces';
import TransactionTable from './TransactionTable';
import TransactionTableSkeleton from '../skeleton/TransactionTableSkeleton';

// PERBAIKI FUNGSI GET TRANSACTIONS - JANGAN IMPORT ROUTE
async function getTransactions(): Promise<Transaction[]> {
  try {
    // GUNAKAN FETCH BIASA, BUKAN IMPORT ROUTE
    const baseUrl = process.env.NEXTAUTH_URL || 'https://siweb-dodolanan.vercel.app';
    
    const response = await fetch(`${baseUrl}/api/transactions`, {
      cache: 'no-store', // DISABLE CACHE
      headers: {
        'Cache-Control': 'no-cache'
      },
      // TAMBAHKAN NEXT REVALIDATE
      next: { revalidate: 0 }
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error saat mengambil data transaksi:', error);
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