import { CheckoutForm } from '@/features/checkout/components/CheckoutForm';
import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Checkout (v0)' };

export default function CheckoutV0Page() {
  return <CheckoutForm />;
}
