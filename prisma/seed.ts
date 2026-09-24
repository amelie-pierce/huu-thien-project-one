import { categoriesData } from './data';
import { prisma } from '@/db/client';

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