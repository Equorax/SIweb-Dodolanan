import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
   console.log('Running seed script...');
  try {
    // Seed data for Product
    const products = await prisma.product.createMany({
      data: [
        { name: 'Mainan-1', price: 150000, stock: 10, imageUrl: '/assets/produk-mainan/Lego-1.png', description: null },
        { name: 'Mainan-2', price: 200000, stock: 5, imageUrl: '/assets/produk-mainan/Lego-2.png', description: null },
        { name: 'Mainan-3', price: 80000, stock: 20, imageUrl: '/assets/produk-mainan/Lego-3.png', description: null },
        { name: 'Mainan-4', price: 80000, stock: 10, imageUrl: '/assets/produk-mainan/Lego-4.png', description: null },
        { name: 'Mainan-5', price: 80000, stock: 10, imageUrl: '/assets/produk-mainan/Lego-5.png', description: null },
      ],
    });
    console.log('Products seeded:', products);

    const allProducts = await prisma.product.findMany();

    // Seed data for Transaction
    const transactions = await prisma.transaction.createMany({
      data: [
        { productId: allProducts[0].id, quantity: 2, total: allProducts[0].price * 2 },
        { productId: allProducts[1].id, quantity: 1, total: allProducts[1].price * 1 },
        { productId: allProducts[2].id, quantity: 3, total: allProducts[2].price * 3 },
        { productId: allProducts[3].id, quantity: 1, total: allProducts[3].price * 1 },
        { productId: allProducts[4].id, quantity: 2, total: allProducts[4].price * 2 },
      ],
    });
    console.log('Transactions seeded:', transactions);

  } catch (error) {
    console.error('Error seeding data:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
