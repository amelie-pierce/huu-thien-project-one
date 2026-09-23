import { CheckoutFormV2 } from '@/features/checkout/components/CheckoutFormV2';
import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Checkout' };

export default function CheckoutPage() {
  return <CheckoutFormV2 />;
}
