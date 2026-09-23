'use client';

import { NEW_CARD, PaymentSection } from './PaymentSection';

import { CheckoutValues, PaymentStatus } from '../types';
import { ContactSection } from './ContactSection';
import { Container } from '@/components/ui';
import { DeliverySection } from './DeliverySection';
import { OrderSummary } from './OrderSummary';
import s from './checkout.module.scss';
import { useCart } from '@/features/cart/cart-context';
import { useState } from 'react';
import { rules, validate, type Errors, type Schema } from '@/lib/validators';
import { PaymentResultModal } from './PaymentResultModal';
import { submitPayment } from '../api';

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
  const [method, setMethod] = useState<string>(NEW_CARD);
  const [sameAsShipping, setSameAsShipping] = useState<boolean>(true);
  const { lines, subtotal, dispatch } = useCart();
  const [status, setStatus] = useState<PaymentStatus>('idle');

  const onChange = (field: keyof CheckoutValues) => (event: React.ChangeEvent<HTMLInputElement>) =>
    setValues((prev) => ({ ...prev, [field]: event.target.value }));
  const onMethodChange = (method: string) => setMethod(method);
  const onSameAsShippingChange = (value: boolean) => setSameAsShipping(value);

  const handlePay = async () => {
    const schema = method === NEW_CARD ? { ...baseSchema, ...newCardSchema } : baseSchema;
    const nextErrors = validate(values, schema);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setStatus('processing');
    const result = await submitPayment({
      cardNumber: method === NEW_CARD ? values.cardNumber : undefined,
    });

    if (result.ok) {
      dispatch({ type: 'clear' });
      setStatus('success');
    } else {
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
          onPay={handlePay}
        />
      </Container>
      <PaymentResultModal status={status} onClose={() => setStatus('idle')} />
    </>
  );
}
