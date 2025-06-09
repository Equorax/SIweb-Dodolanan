// app/admin/kelola-transaksi/page.tsx
import { TransactionDataWithSuspense } from 'app/components/transactions/TransactionData';

// TAMBAHKAN FORCE DYNAMIC
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default function KelolaTransaksiPage() {
  return (
    <main className="container mx-auto">
      <TransactionDataWithSuspense />
    </main>
  );
}