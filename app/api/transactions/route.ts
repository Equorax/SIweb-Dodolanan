// app/api/transactions/route.ts
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// GET /api/transactions
export async function GET() {
  try {
    const transactions = await prisma.transaction.findMany({
      include: {
        product: true,
      },
    });
    
    return NextResponse.json(transactions);
  } catch (error) {
    console.error('Error fetching transactions:', error);
    return NextResponse.json(
      { error: 'Gagal mengambil data transaksi' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

// POST /api/transactions
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { productId, quantity } = body;
    
    if (!productId || !quantity) {
      return NextResponse.json(
        { error: 'Product ID dan quantity diperlukan' },
        { status: 400 }
      );
    }
    
    const product = await prisma.product.findUnique({
      where: { id: Number(productId) },
    });
    
    if (!product) {
      return NextResponse.json(
        { error: 'Produk tidak ditemukan' },
        { status: 404 }
      );
    }
    
    if (product.stock < quantity) {
      return NextResponse.json(
        { error: 'Stok tidak mencukupi' },
        { status: 400 }
      );
    }
    
    const total = product.price * quantity;
    
    const transaction = await prisma.transaction.create({
      data: {
        productId: Number(productId),
        quantity: Number(quantity),
        total,
      },
      include: {
        product: true,
      },
    });
    
    await prisma.product.update({
      where: { id: Number(productId) },
      data: { stock: product.stock - quantity },
    });
    
    return NextResponse.json(transaction, { status: 201 });
  } catch (error) {
    console.error('Error creating transaction:', error);
    return NextResponse.json(
      { error: 'Gagal memproses transaksi' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}