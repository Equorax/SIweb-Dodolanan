// app/admin/kelola-transaksi/page.tsx
import { TransactionDataWithSuspense } from 'app/components/transactions/TransactionData';

export default function KelolaTransaksiPage() {
  return (
    <main className="container mx-auto">
      <TransactionDataWithSuspense />
    </main>
  );
}