// import { NextResponse } from 'next/server';
// import { PrismaClient } from '@prisma/client';
// import { NextRequest } from 'next/server';

// const prisma = new PrismaClient();

// // Define the route context type explicitly
// type RouteContext = {
//   params: { id: string };
// };

// // Get Controller with updated parameter structure
// export async function GET(
//   request: NextRequest,
//   { params }: RouteContext
// ) {
//   try {
//     const id = parseInt(params.id);
    
//     if (isNaN(id)) {
//       return NextResponse.json(
//         { error: 'ID transaksi tidak valid' },
//         { status: 400 }
//       );
//     }
    
//     const transaction = await prisma.transaction.findUnique({
//       where: { id },
//       include: {
//         product: true,
//       },
//     });
    
//     if (!transaction) {
//       return NextResponse.json(
//         { error: 'Transaksi tidak ditemukan' },
//         { status: 404 }
//       );
//     }
    
//     return NextResponse.json(transaction);
//   } catch (error) {
//     console.error('Error fetching transaction:', error);
//     return NextResponse.json(
//       { error: 'Gagal mengambil data transaksi' },
//       { status: 500 }
//     );
//   } finally {
//     await prisma.$disconnect();
//   }
// }

// // Put Controller with updated parameter structure
// export async function PUT(
//   request: NextRequest,
//   { params }: RouteContext
// ) {
//   try {
//     const id = parseInt(params.id);
    
//     if (isNaN(id)) {
//       return NextResponse.json(
//         { error: 'ID transaksi tidak valid' },
//         { status: 400 }
//       );
//     }
    
//     const body = await request.json();
//     const { quantity } = body;
    
//     if (!quantity || quantity <= 0) {
//       return NextResponse.json(
//         { error: 'Jumlah harus positif' },
//         { status: 400 }
//       );
//     }
    
//     const existingTransaction = await prisma.transaction.findUnique({
//       where: { id },
//       include: {
//         product: true,
//       },
//     });
    
//     if (!existingTransaction) {
//       return NextResponse.json(
//         { error: 'Transaksi tidak ditemukan' },
//         { status: 404 }
//       );
//     }
    
//     const quantityDifference = existingTransaction.quantity - quantity;
    
//     if (quantityDifference < 0 && existingTransaction.product.stock < Math.abs(quantityDifference)) {
//       return NextResponse.json(
//         { error: 'Stok tidak mencukupi' },
//         { status: 400 }
//       );
//     }
    
//     const total = existingTransaction.product.price * quantity;
    
//     const updatedTransaction = await prisma.transaction.update({
//       where: { id },
//       data: {
//         quantity: Number(quantity),
//         total,
//       },
//       include: {
//         product: true,
//       },
//     });
    
//     await prisma.product.update({
//       where: { id: existingTransaction.productId },
//       data: { stock: existingTransaction.product.stock + quantityDifference },
//     });
    
//     return NextResponse.json(updatedTransaction);
//   } catch (error) {
//     console.error('Error updating transaction:', error);
//     return NextResponse.json(
//       { error: 'Gagal memperbarui transaksi' },
//       { status: 500 }
//     );
//   } finally {
//     await prisma.$disconnect();
//   }
// }

// // Delete Controller with updated parameter structure
// export async function DELETE(
//   request: NextRequest,
//   { params }: RouteContext
// ) {
//   try {
//     const id = parseInt(params.id);
    
//     if (isNaN(id)) {
//       return NextResponse.json(
//         { error: 'ID transaksi tidak valid' },
//         { status: 400 }
//       );
//     }
    
//     const transaction = await prisma.transaction.findUnique({
//       where: { id },
//     });
    
//     if (!transaction) {
//       return NextResponse.json(
//         { error: 'Transaksi tidak ditemukan' },
//         { status: 404 }
//       );
//     }
    
//     const product = await prisma.product.findUnique({
//       where: { id: transaction.productId },
//     });
    
//     await prisma.transaction.delete({
//       where: { id },
//     });
    
//     if (product) {
//       await prisma.product.update({
//         where: { id: transaction.productId },
//         data: { stock: product.stock + transaction.quantity },
//       });
//     }
    
//     return NextResponse.json({ message: 'Transaksi berhasil dihapus' });
//   } finally {
//     await prisma.$disconnect();
//   }
// }

// // Optional: specify edge runtime if needed
// // export const runtime = 'edge';



import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { NextRequest } from 'next/server';



// Get Controller dengan format Promise params
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Tunggu params yang berbentuk Promise
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

// Put Controller dengan format Promise params
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Tunggu params yang berbentuk Promise
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
    
    const quantityDifference = existingTransaction.quantity - quantity;
    
    if (quantityDifference < 0 && existingTransaction.product.stock < Math.abs(quantityDifference)) {
      return NextResponse.json(
        { error: 'Stok tidak mencukupi' },
        { status: 400 }
      );
    }
    
    const total = existingTransaction.product.price * quantity;
    
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

// Delete Controller dengan format Promise params
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Tunggu params yang berbentuk Promise
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
    });
    
    if (!transaction) {
      return NextResponse.json(
        { error: 'Transaksi tidak ditemukan' },
        { status: 404 }
      );
    }
    
    const product = await prisma.product.findUnique({
      where: { id: transaction.productId },
    });
    
    await prisma.transaction.delete({
      where: { id },
    });
    
    if (product) {
      await prisma.product.update({
        where: { id: transaction.productId },
        data: { stock: product.stock + transaction.quantity },
      });
    }
    
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