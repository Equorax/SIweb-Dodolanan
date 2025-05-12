// app/api/transactions/[id]/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { NextRequest } from 'next/server';

// GET /api/transactions/[id]
export async function GET(
  request: NextRequest,
  { params }: { params: Promise <{ id: string }> }
) {
  try {
    const resolvedParams = await params;
    const id = parseInt(resolvedParams.id);
    
    if (isNaN(id)) {
      return NextResponse.json(
        { error: 'ID transaksi tidak valid' },
        { status: 400 }
      );
    }
    
    const transaction = await prisma.transaction.findUnique({
      where: { id },
      include: {
        product: true,
      },
    });
    
    if (!transaction) {
      return NextResponse.json(
        { error: 'Transaksi tidak ditemukan' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(transaction);
  } catch (error) {
    console.error('Error fetching transaction:', error);
    return NextResponse.json(
      { error: 'Gagal mengambil data transaksi' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

// PUT /api/transactions/[id]
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise <{ id: string }> }
) {
  try {
    const resolvedParams = await params;
    const id = parseInt(resolvedParams.id);
    
    if (isNaN(id)) {
      return NextResponse.json(
        { error: 'ID transaksi tidak valid' },
        { status: 400 }
      );
    }
    
    const body = await request.json();
    const { quantity } = body;
    
    if (!quantity || quantity <= 0) {
      return NextResponse.json(
        { error: 'Jumlah harus positif' },
        { status: 400 }
      );
    }
    
    const existingTransaction = await prisma.transaction.findUnique({
      where: { id },
      include: {
        product: true,
      },
    });
    
    if (!existingTransaction) {
      return NextResponse.json(
        { error: 'Transaksi tidak ditemukan' },
        { status: 404 }
      );
    }
    
    // Hitung perbedaan kuantitas untuk memperbarui stok
    const quantityDifference = existingTransaction.quantity - quantity;
    
    // Periksa apakah stok mencukupi jika ingin menambah kuantitas
    if (quantityDifference < 0 && existingTransaction.product.stock < Math.abs(quantityDifference)) {
      return NextResponse.json(
        { error: 'Stok tidak mencukupi' },
        { status: 400 }
      );
    }
    
    // Hitung total baru
    const total = existingTransaction.product.price * quantity;
    
    // Update transaksi
    const updatedTransaction = await prisma.transaction.update({
      where: { id },
      data: {
        quantity: Number(quantity),
        total,
      },
      include: {
        product: true,
      },
    });
    
    // Update stok produk
    await prisma.product.update({
      where: { id: existingTransaction.productId },
      data: { stock: existingTransaction.product.stock + quantityDifference },
    });
    
    return NextResponse.json(updatedTransaction);
  } catch (error) {
    console.error('Error updating transaction:', error);
    return NextResponse.json(
      { error: 'Gagal memperbarui transaksi' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

// DELETE /api/transactions/[id]
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await params;
    const id = parseInt(resolvedParams.id);
   
    
    if (isNaN(id)) {
      return NextResponse.json(
        { error: 'ID transaksi tidak valid' },
        { status: 400 }
      );
    }
    
    const transaction = await prisma.transaction.findUnique({
      where: { id },
      include: {
        product: true,
      },
    });
    
    if (!transaction) {
      return NextResponse.json(
        { error: 'Transaksi tidak ditemukan' },
        { status: 404 }
      );
    }
    
    // Hapus transaksi
    await prisma.transaction.delete({
      where: { id },
    });
    
    // Kembalikan stok produk
    await prisma.product.update({
      where: { id: transaction.productId },
      data: { stock: transaction.product.stock + transaction.quantity },
    });
    
    return NextResponse.json({ message: 'Transaksi berhasil dihapus' });
  } catch (error) {
    console.error('Error deleting transaction:', error);
    return NextResponse.json(
      { error: 'Gagal menghapus transaksi' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}