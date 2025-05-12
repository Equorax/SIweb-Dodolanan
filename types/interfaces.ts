export interface Product {
  id: number;
  name: string;
  price: number;
  stock: number;
  imageUrl?: string | null;
  imageData?: Buffer | null;  // Menambahkan field untuk data gambar binary
  imageMimeType?: string | null;  // Menambahkan field untuk tipe MIME
  description?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface Transaction {
  id: number;
  productId: number;
  quantity: number;
  total: number;
  createdAt: string;
  product: Product;
}