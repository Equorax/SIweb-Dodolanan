import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET /api/products
export async function GET() {
  try {
    const products = await prisma.product.findMany({
      orderBy: {
        id: 'asc',
      },
    });
    
    return NextResponse.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json(
      { error: 'Gagal mengambil data produk' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

// POST /api/products
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, price, stock, imageUrl, description } = body;
    
    if (!name || price === undefined) {
      return NextResponse.json(
        { error: 'Nama dan harga produk wajib diisi' },
        { status: 400 }
      );
    }
    
    const product = await prisma.product.create({
      data: {
        name,
        price: Number(price),
        stock: stock ? Number(stock) : 0,
        imageUrl,
        description,
      },
    });
    
    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    console.error('Error creating product:', error);
    return NextResponse.json(
      { error: 'Gagal membuat produk baru' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}