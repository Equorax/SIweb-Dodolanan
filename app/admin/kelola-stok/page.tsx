// app/admin/kelola-stok/page.tsx
import { ProductDataWithSuspense } from 'app/components/products/ProductData';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default function KelolaStokPage() {
  return (
    <main className="container mx-auto">
      <ProductDataWithSuspense />
    </main>
  );
}


