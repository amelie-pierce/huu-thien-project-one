'use client';

import type { CheckoutValues, PaymentStatus, SavedCard } from '../types';
import { createOrder, getSavedCards } from '../actions';
import { rules, validate, type Errors, type Schema } from '@/lib/validators';
import { useEffect, useState } from 'react';

import { ContactSection } from './v0/ContactSection';
import { Container } from '@/components/ui';
import { DeliverySection } from './v0/DeliverySection';
import { NEW_CARD } from '../constants';
import { OrderSummary } from './OrderSummary';
import { PaymentResultModal } from './PaymentResultModal';
import { PaymentSection } from './v0/PaymentSection';
import s from './checkout.module.scss';
import { useAuth } from '@/features/auth/auth-context';
import { useCart } from '@/features/cart/cart-context';

const EMPTY: CheckoutValues = {
  email: '',
  name: '',
  phone: '',
  country: '',
  address1: '',
  address2: '',
  city: '',
  state: '',
  postalCode: '',
  cardName: '',
  cardNumber: '',
  expiry: '',
  cvv: '',
};

const baseSchema: Schema<CheckoutValues> = {
  email: [rules.required(), rules.email()],
  name: [rules.required()],
  phone: [rules.required()],
  country: [rules.required()],
  address1: [rules.required()],
  city: [rules.required()],
  state: [rules.required()],
  postalCode: [rules.required()],
};

const newCardSchema: Schema<CheckoutValues> = {
  cardName: [rules.required()],
  cardNumber: [rules.required(), rules.cardNumber()],
  expiry: [rules.required(), rules.expiry()],
  cvv: [rules.required(), rules.cvv()],
};

export function CheckoutForm() {
  const [values, setValues] = useState<CheckoutValues>(EMPTY);
  const [errors, setErrors] = useState<Errors<CheckoutValues>>({});
  const [cards, setCards] = useState<SavedCard[]>([]);
  const [method, setMethod] = useState<string>(NEW_CARD);
  const [sameAsShipping, setSameAsShipping] = useState<boolean>(true);
  const { user } = useAuth();
  const { lines, subtotal, dispatch } = useCart();
  const [status, setStatus] = useState<PaymentStatus>('idle');

  useEffect(() => {
    if (!user) return;
    let active = true;
    getSavedCards().then((list) => active && setCards(list));
    return () => {
      active = false;
    };
  }, [user]);

  const onChange = (field: keyof CheckoutValues) => (event: React.ChangeEvent<HTMLInputElement>) =>
    setValues((prev) => ({ ...prev, [field]: event.target.value }));
  const onMethodChange = (method: string) => setMethod(method);
  const onSameAsShippingChange = (value: boolean) => setSameAsShipping(value);

  const handlePay = async () => {
    const schema = method === NEW_CARD ? { ...baseSchema, ...newCardSchema } : baseSchema;
    const nextErrors = validate(values as Record<keyof CheckoutValues, string>, schema);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setStatus('processing');
    try {
      const result = await createOrder({
        values,
        paymentMethod: method,
        lines: lines.map(({ productId, size, qty }) => ({ productId, size, qty })),
      });

      if (result.ok) {
        dispatch({ type: 'clear' });
        setStatus('success');
      } else {
        setStatus('failed');
      }
    } catch {
      setStatus('failed');
    }
  };

  return (
    <>
      <Container className={s.layout}>
        <form className={s.main} onSubmit={(event) => event.preventDefault()} noValidate>
          <ContactSection values={values} errors={errors} onChange={onChange} />
          <DeliverySection values={values} errors={errors} onChange={onChange} />
          <PaymentSection
            cards={cards}
            values={values}
            errors={errors}
            onChange={onChange}
            method={method}
            onMethodChange={onMethodChange}
            sameAsShipping={sameAsShipping}
            onSameAsShippingChange={onSameAsShippingChange}
          />
        </form>
        <OrderSummary
          lines={lines}
          totals={{ subtotal, shipping: 0, tax: 0, total: subtotal }}
          loading={status === 'processing'}
          disabled={!lines.length}
          onPay={handlePay}
        />
      </Container>
      <PaymentResultModal status={status} onClose={() => setStatus('idle')} />
    </>
  );
}
