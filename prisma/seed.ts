// import { PrismaClient } from '@prisma/client';

// const prisma = new PrismaClient();

// async function main() {
//   // Data dummy produk
//   const products = await prisma.product.createMany({
//     data: [
//       { name: 'Robot Mainan', price: 150000, stock: 10 },
//       { name: 'Mobil Remote', price: 200000, stock: 5 },
//       { name: 'Boneka Beruang', price: 80000, stock: 20 },
//     ],
//   });

//   console.log(`🧸 Produk dummy berhasil ditambahkan: ${products.count}`);
// }

// main()
//   .catch((e) => {
//     console.error(e);
//     process.exit(1);
//   })
//   .finally(async () => {
//     await prisma.$disconnect();
//   });


import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  try {
    // Seed data for Product
    const products = await prisma.product.createMany({
      data: [
        { name: 'Mainan-1', price: 150000, stock: 10 },
        { name: 'Mainan-2', price: 200000, stock: 5 },
        { name: 'Mainan-3', price: 80000, stock: 20 },
        { name: 'Mainan-4', price: 80000, stock: 10 },
        { name: 'Mainan-5', price: 80000, stock: 10 },
        
      ],
    });
    console.log('Products seeded:', products);

    // Get all products to use their IDs in transaction
    const allProducts = await prisma.product.findMany();
    
    // Seed data for Transaction
    const transactions = await prisma.transaction.createMany({
      data: [
        { productId: allProducts[0].id, quantity: 2, total: allProducts[0].price * 2 },
        { productId: allProducts[1].id, quantity: 1, total: allProducts[1].price * 1 },
        { productId: allProducts[2].id, quantity: 3, total: allProducts[2].price * 3 },
        { productId: allProducts[3].id, quantity: 1, total: allProducts[3].price * 1 },
        { productId: allProducts[4].id, quantity: 2, total: allProducts[4].price * 1 },
        
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
