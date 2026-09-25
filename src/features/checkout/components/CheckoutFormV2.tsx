'use client';

import type { CheckoutValues, PaymentStatus, SavedCard } from '../types';
import { createOrder, getSavedCards } from '../actions';
import { useCallback, useEffect, useRef, useState } from 'react';

import { ContactSection } from './ContactSection';
import { Container } from '@/components/ui';
import { DeliverySection } from './DeliverySection';
import { NEW_CARD } from '../constants';
import { OrderSummary } from './OrderSummary';
import { PaymentResultModal } from './PaymentResultModal';
import { PaymentSection } from './PaymentSection';
import s from './checkout.module.scss';
import { useAuth } from '@/features/auth/auth-context';
import { useCart } from '@/features/cart/cart-context';

export function CheckoutFormV2() {
  const formRef = useRef<HTMLFormElement>(null);
  const { user } = useAuth();
  const [cards, setCards] = useState<SavedCard[]>([]);
  const [method, setMethod] = useState<string>(NEW_CARD);
  const { lines, subtotal, dispatch } = useCart();
  const [status, setStatus] = useState<PaymentStatus>('idle');

  const fetchCards = useCallback(
    () => (user ? getSavedCards() : Promise.resolve<SavedCard[]>([])),
    [user]
  );

  function applyCards(list: SavedCard[]) {
    setCards(list);
    setMethod(list[0]?.id ?? NEW_CARD);
  }

  useEffect(() => {
    let active = true;
    fetchCards().then((list) => active && applyCards(list));
    return () => {
      active = false;
    };
  }, [fetchCards]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;

    if (!form.checkValidity()) {
      form.querySelector<HTMLElement>(':invalid:not(fieldset)')?.focus();
      return;
    }

    if (!lines.length || status === 'processing') return;

    const values = Object.fromEntries(new FormData(form)) as CheckoutValues;

    setStatus('processing');
    try {
      const result = await createOrder({
        values,
        paymentMethod: method,
        lines: lines.map(({ productId, size, qty }) => ({ productId, size, qty })),
      });

      if (result.ok) {
        dispatch({ type: 'clear' });
        form.reset();
        applyCards(await fetchCards());
        setStatus('success');
      } else {
        setStatus('failed');
      }
    } catch {
      setStatus('failed');
    }
  }

  return (
    <>
      <Container className={s.layout}>
        <form ref={formRef} id="checkout-form" className={s.main} onSubmit={handleSubmit} noValidate>
          <ContactSection />
          <DeliverySection />
          <PaymentSection cards={cards} method={method} onMethodChange={setMethod} />
        </form>
        <OrderSummary
          lines={lines}
          totals={{ subtotal, shipping: 0, tax: 0, total: subtotal }}
          loading={status === 'processing'}
          disabled={!lines.length}
          onPay={() => formRef.current?.requestSubmit()}
        />
      </Container>
      <PaymentResultModal status={status} onClose={() => setStatus('idle')} />
    </>
  );
}
