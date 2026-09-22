'use client';

import { NEW_CARD, PaymentSection } from './PaymentSection';

import { CheckoutValues } from '../types';
import { ContactSection } from './ContactSection';
import { Container } from '@/components/ui';
import { DeliverySection } from './DeliverySection';
import { Errors } from '@/lib/validators';
import { OrderSummary } from './OrderSummary';
import s from './checkout.module.scss';
import { useCart } from '@/features/cart/cart-context';
import { useState } from 'react';

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

export function CheckoutForm() {
  const [values, setValues] = useState<CheckoutValues>(EMPTY);
  const [errors, setErrors] = useState<Errors<CheckoutValues>>({});
  const [method, setMethod] = useState<string>(NEW_CARD);
  const [sameAsShipping, setSameAsShipping] = useState<boolean>(true);
  const { lines, subtotal, dispatch } = useCart();

  const onChange = (field: keyof CheckoutValues) => (event: React.ChangeEvent<HTMLInputElement>) =>
    setValues((prev) => ({ ...prev, [field]: event.target.value }));
  const onMethodChange = (method: string) => setMethod(method);
  const onSameAsShippingChange = (value: boolean) => setSameAsShipping(value);

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
          loading={false}
          onPay={() => {}}
        />
      </Container>
    </>
  );
}
