import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { NextRequest } from 'next/server';

// GET /api/products/[id]
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = await params;
    const productId = parseInt(id);
        
    if (isNaN(productId)) {
      return NextResponse.json(
        { error: 'ID produk tidak valid' },
        { status: 400 }
      );
    }
    
    const product = await prisma.product.findUnique({
      where: { id: productId },
    });
    
    if (!product) {
      return NextResponse.json(
        { error: 'Produk tidak ditemukan' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(product);
  } catch (error) {
    console.error('Error fetching product:', error);
    return NextResponse.json(
      { error: 'Gagal mengambil data produk' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

// PUT /api/products/[id]
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const productId = parseInt(params.id);
    
    if (isNaN(productId)) {
      return NextResponse.json(
        { error: 'ID produk tidak valid' },
        { status: 400 }
      );
    }
    
    const body = await request.json();
    const { name, price, stock, imageUrl, description } = body;
    
    const existingProduct = await prisma.product.findUnique({
      where: { id: productId },
    });
    
    if (!existingProduct) {
      return NextResponse.json(
        { error: 'Produk tidak ditemukan' },
        { status: 404 }
      );
    }
    
    const updatedProduct = await prisma.product.update({
      where: { id: productId },
      data: {
        name: name !== undefined ? name : existingProduct.name,
        price: price !== undefined ? Number(price) : existingProduct.price,
        stock: stock !== undefined ? Number(stock) : existingProduct.stock,
        imageUrl: imageUrl !== undefined ? imageUrl : existingProduct.imageUrl,
        description: description !== undefined ? description : existingProduct.description,
      },
    });
    
    return NextResponse.json(updatedProduct);
  } catch (error) {
    console.error('Error updating product:', error);
    return NextResponse.json(
      { error: 'Gagal memperbarui produk' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

// DELETE /api/products/[id]
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const productId = parseInt(params.id);
    
    if (isNaN(productId)) {
      return NextResponse.json(
        { error: 'ID produk tidak valid' },
        { status: 400 }
      );
    }
    
    const product = await prisma.product.findUnique({
      where: { id: productId },
    });
    
    if (!product) {
      return NextResponse.json(
        { error: 'Produk tidak ditemukan' },
        { status: 404 }
      );
    }
    
    // Periksa apakah produk memiliki transaksi terkait
    const transactions = await prisma.transaction.findMany({
      where: { productId },
    });
    
    if (transactions.length > 0) {
      return NextResponse.json(
        { error: 'Tidak dapat menghapus produk yang memiliki transaksi' },
        { status: 400 }
      );
    }
    
    await prisma.product.delete({
      where: { id: productId },
    });
    
    return NextResponse.json({ message: 'Produk berhasil dihapus' });
  } catch (error) {
    console.error('Error deleting product:', error);
    return NextResponse.json(
      { error: 'Gagal menghapus produk' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}