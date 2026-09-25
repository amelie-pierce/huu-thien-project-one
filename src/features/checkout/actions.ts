'use server';

import type { CheckoutValues, SavedCard } from './types';

import type { CartLine } from '@/features/cart/types';
import { NEW_CARD } from './constants';
import { getCurrentUser } from '@/features/auth/auth.service';
import { prisma } from '@/db/client';

type CreateOrderInput = {
  values: CheckoutValues;
  lines: Pick<CartLine, 'productId' | 'size' | 'qty'>[];
  paymentMethod: string;
};

export type CreateOrderResult = { ok: true; orderId: string } | { ok: false; orderId?: string };

const cardBrand = (cardNumber: string) =>
  cardNumber.startsWith('4') ? 'Visa' : cardNumber.startsWith('5') ? 'Master card' : 'Card';

export async function getSavedCards(): Promise<SavedCard[]> {
  const user = await getCurrentUser();
  if (!user) return [];

  return prisma.savedCard.findMany({
    where: { userId: user.id },
    select: { id: true, brand: true, last4: true, expiry: true },
    orderBy: { createdAt: 'asc' },
  });
}

async function pay(paymentMethod: string, cardNumber: string, userId?: string) {
  if (paymentMethod === NEW_CARD) return !cardNumber.endsWith('0000'); //For simulate Payment failed, If card ends with '0000' => payment fails
  if (!userId) return false;
  const card = await prisma.savedCard.findFirst({ where: { id: paymentMethod, userId } });
  return !!card;
}

export async function createOrder({
  values,
  lines,
  paymentMethod,
}: CreateOrderInput): Promise<CreateOrderResult> {
  if (!lines.length) return { ok: false };

  const sizes = await prisma.productSize.findMany({
    where: {
      OR: lines.map((line) => ({ productId: Number(line.productId), name: line.size })),
    },
  });

  const items = [];
  for (const line of lines) {
    const size = sizes.find((s) => s.productId === Number(line.productId) && s.name === line.size);
    if (!size || !Number.isInteger(line.qty) || line.qty < 1) return { ok: false };
    items.push({ productId: size.productId, size: size.name, unitPrice: size.price, qty: line.qty });
  }

  const email = values.email.trim().toLowerCase();
  const sessionUser = await getCurrentUser();
  const user =
    sessionUser ?? (await prisma.user.findUnique({ where: { email }, select: { id: true } }));
  const cardNumber = values.cardNumber?.replace(/\s/g, '') ?? '';
  const paid = await pay(paymentMethod, cardNumber, sessionUser?.id);

  const order = await prisma.order.create({
    data: {
      status: paid ? 'PAID' : 'FAILED',
      email,
      name: values.name,
      phone: values.phone,
      country: values.country,
      address1: values.address1,
      address2: values.address2 || null,
      city: values.city,
      state: values.state,
      postalCode: values.postalCode,
      total: items.reduce((sum, item) => sum + item.unitPrice * item.qty, 0),
      userId: user?.id,
      items: { create: items },
    },
  });

  if (paid && sessionUser && paymentMethod === NEW_CARD) {
    const card = { userId: sessionUser.id, last4: cardNumber.slice(-4), expiry: values.expiry };
    await prisma.savedCard.upsert({
      where: { userId_last4_expiry: card },
      create: { ...card, brand: cardBrand(cardNumber) },
      update: {},
    });
  }

  return paid ? { ok: true, orderId: order.id } : { ok: false, orderId: order.id };
}
