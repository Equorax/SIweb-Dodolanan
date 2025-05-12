import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    // 1. Hitung total pendapatan dari semua transaksi
    const totalRevenue = await prisma.transaction.aggregate({
      _sum: {
        total: true,
      },
    });

    // 2. Hitung total produk yang tersedia
    const totalProducts = await prisma.product.count();

    // 3. Hitung total stok produk
    const stockSum = await prisma.product.aggregate({
      _sum: {
        stock: true,
      },
    });
    
    // 4. Hitung jumlah transaksi
    const totalTransactions = await prisma.transaction.count();

    // 5. Dapatkan produk paling banyak terjual
    const mostSoldProduct = await prisma.transaction.groupBy({
      by: ['productId'],
      _sum: {
        quantity: true,
      },
      orderBy: {
        _sum: {
          quantity: 'desc',
        },
      },
      take: 1,
    });

    // 6. Dapatkan detail produk yang paling banyak terjual
    let bestSellingProduct = null;
    if (mostSoldProduct.length > 0) {
      const productDetails = await prisma.product.findUnique({
        where: {
          id: mostSoldProduct[0].productId,
        },
      });
      
      bestSellingProduct = {
        ...productDetails,
        soldQuantity: mostSoldProduct[0]._sum.quantity,
      };
    }

    // 7. Dapatkan data transaksi per bulan untuk grafik (6 bulan terakhir)
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
    
    const monthlyTransactions = await prisma.$queryRaw`
      SELECT 
        DATE_TRUNC('month', "createdAt") as month,
        SUM(total) as revenue
      FROM "Transaction"
      WHERE "createdAt" >= ${sixMonthsAgo}
      GROUP BY DATE_TRUNC('month', "createdAt")
      ORDER BY month ASC
    `;

    return NextResponse.json({
      totalRevenue: totalRevenue._sum.total || 0,
      totalProducts,
      totalStock: stockSum._sum.stock || 0,
      totalTransactions,
      bestSellingProduct,
      monthlyRevenue: monthlyTransactions,
    });
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch dashboard data' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}