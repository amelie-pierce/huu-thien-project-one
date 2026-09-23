'use client';

import { NEW_CARD, PaymentSection } from './PaymentSection';
import { useRef, useState } from 'react';

import { ContactSection } from './ContactSection';
import { Container } from '@/components/ui';
import { DeliverySection } from './DeliverySection';
import { OrderSummary } from './OrderSummary';
import { PaymentResultModal } from './PaymentResultModal';
import { PaymentStatus } from '../types';
import s from './checkout.module.scss';
import { submitPayment } from '../api';
import { useCart } from '@/features/cart/cart-context';

export function CheckoutFormV2() {
  const formRef = useRef<HTMLFormElement>(null);
  const newCardRef = useRef<HTMLFieldSetElement>(null);
  const [method, setMethod] = useState<string>(NEW_CARD);
  const { lines, subtotal, dispatch } = useCart();
  const [status, setStatus] = useState<PaymentStatus>('idle');

  function handleFormChange(event: React.FormEvent<HTMLFormElement>) {
    const target = event.target as HTMLElement & { name?: string; value?: string };
    if (target.name !== 'paymentMethod' || !newCardRef.current) return;
    newCardRef.current.disabled = target.value !== NEW_CARD;
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;

    if (!form.checkValidity()) {
      form.querySelector<HTMLElement>(':invalid:not(fieldset)')?.focus();
      return;
    }

    const data = Object.fromEntries(new FormData(form)) as Record<string, string>;

    setStatus('processing');
    const result = await submitPayment({ cardNumber: data.cardNumber });

    if (result.ok) {
      dispatch({ type: 'clear' });
      setStatus('success');
    } else {
      setStatus('failed');
    }
  }

  return (
    <>
      <Container className={s.layout}>
        <form
          ref={formRef}
          id="checkout-form"
          className={s.main}
          onSubmit={handleSubmit}
          onChange={handleFormChange}
          noValidate
        >
          <ContactSection />
          <DeliverySection />
          <PaymentSection method={method} onMethodChange={(newMethod) => setMethod(newMethod)} />
        </form>
        <OrderSummary
          lines={lines}
          totals={{ subtotal, shipping: 0, tax: 0, total: subtotal }}
          loading={status === 'processing'}
          onPay={() => formRef.current?.requestSubmit()}
        />
      </Container>
      <PaymentResultModal status={status} onClose={() => setStatus('idle')} />
    </>
  );
}
