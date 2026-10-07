import 'dotenv/config';

import { prisma } from '@/db/client';

// Removes all customer data (users, sessions, saved cards, orders) and keeps the menu
// (Category, Product, ProductSize). Children are deleted first, all in one transaction.
async function main() {
  await prisma.$transaction([
    prisma.orderItem.deleteMany(),
    prisma.order.deleteMany(),
    prisma.savedCard.deleteMany(),
    prisma.session.deleteMany(),
    prisma.user.deleteMany(),
  ]);
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(() => prisma.$disconnect());
