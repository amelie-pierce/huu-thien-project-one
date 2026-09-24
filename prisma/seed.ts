import { CategoryCreateInput } from '@/lib/prisma/models/Category';
import { categoriesData } from './data';
import { prisma } from '@/db/client';

// async function main() {
//   console.log('🌱 Starting database seeding...');

//   // 1. Clean up existing data to prevent duplicate key errors
//   await prisma.product.deleteMany({});
//   await prisma.category.deleteMany({});

//   //   // 2. Create Categories (including parent-child relationships)
//   const coffee = await prisma.category.create({
//     data: {
//       slug: 'coffee',
//       name: 'Coffee',
//       updatedAt: new Date(),
//     },
//   });

//   //   // 3. Create Products and Link Categories (Many-to-Many Implicit)
//   await prisma.product.create({
//     data: {
//       id: '1',
//       name: 'Cold Brew',
//       slug: 'cold-brew',
//       description: 'Refreshing cold brew coffee made from premium beans.',
//       price: 16,
//       isNew: true,
//       imageUrl: '/images/shop/products/expresso_cropped.png',
//       categoryId: coffee.slug,
//       createdAt: new Date(),
//       updatedAt: new Date(),
//     },
//   });

//   console.log('🏁 Seeding finished successfully!');
// }

// main()
//   .catch((e) => {
//     console.error('❌ Seeding failed:', e);
//     process.exit(1);
//   })
//   .finally(async () => {
//     await prisma.$disconnect();
//   });


async function main() {
  console.log('🌱 Starting database seed...');

  // Clean existing data to avoid unique constraint violations on re-runs
  await prisma.product.deleteMany({});
  await prisma.category.deleteMany({});

  // Seed Categories with nested Products


  for (const category of categoriesData) {
    await prisma.category.create({
      data: category,
    });
  }

  console.log('✅ Seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });