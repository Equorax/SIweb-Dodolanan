// app/admin/kelola-stok/page.tsx
import { ProductDataWithSuspense } from 'app/components/products/ProductData';

export default function KelolaStokPage() {
  return (
    <main className="container mx-auto">
      <ProductDataWithSuspense />
    </main>
  );
}