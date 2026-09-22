import { CheckoutForm } from '@/features/checkout/components/CheckoutForm';
import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Checkout' };

export default function CheckoutPage() {
  return <CheckoutForm />;
}
