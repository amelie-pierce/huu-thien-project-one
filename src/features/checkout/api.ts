import type { SavedCard } from './types';

export const savedCards: SavedCard[] = [
  { id: 'visa-4242', brand: 'Visa', last4: '4242', expiry: '12/28' },
  { id: 'master-688', brand: 'Master card', last4: '688', expiry: '12/28' },
];

export async function submitPayment(payload: {
  cardNumber?: string;
}): Promise<{ ok: boolean; orderId?: string }> {
  await new Promise((resolve) => setTimeout(resolve, 900));
  const failed = payload.cardNumber?.replace(/\s/g, '').endsWith('0000');
  return failed ? { ok: false } : { ok: true, orderId: `ORD-${Date.now()}` };
}
