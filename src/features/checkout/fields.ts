import { FieldConfig } from '@/components/ui/field/field';

const REQUIRED = { valueMissing: 'This field is required' };

export const CONTACT_FIELDS: FieldConfig[] = [
  {
    name: 'email',
    label: 'Email',
    type: 'email',
    placeholder: 'name@email.com',
    autoComplete: 'email',
    required: true,
    messages: {
      valueMissing: 'Please enter your email',
      typeMismatch: "This doesn't look like a valid email address",
    },
    span: "full"
  },
];

export const DELIVERY_FIELDS: FieldConfig[] = [
  {
    name: 'name',
    label: 'Name',
    placeholder: 'Placeholder',
    autoComplete: 'name',
    required: true,
    messages: REQUIRED,
  },
  {
    name: 'phone',
    label: 'Phone',
    type: 'tel',
    inputMode: 'numeric',
    placeholder: 'Placeholder',
    autoComplete: 'tel',
    required: true,
    pattern: '[0-9]*',
    minLength: 10,
    maxLength: 12,
    messages: {
      ...REQUIRED,
      patternMismatch: 'Numbers only',
      tooShort: 'Phone number must be 10-12 digits',
      tooLong: 'Phone number must be 10-12 digits',
    },
  },
];

export const ADDRESS_FIELDS: FieldConfig[] = [
  {
    name: 'country',
    label: 'Country',
    placeholder: 'Placeholder',
    autoComplete: 'country-name',
    required: true,
    messages: REQUIRED,
    span: "full",
  },
  {
    name: 'address1',
    label: 'Address line 1',
    placeholder: 'Placeholder',
    autoComplete: 'address-line1',
    required: true,
    messages: REQUIRED,
    span: "full",
  },
  {
    name: 'address2',
    label: 'Address line 2 (optional)',
    placeholder: 'Placeholder',
    autoComplete: 'address-line2',
    span: "full",
  },
  {
    name: 'city',
    label: 'City',
    placeholder: 'Placeholder',
    autoComplete: 'address-level2',
    required: true,
    messages: REQUIRED,
  },
  {
    name: 'state',
    label: 'State',
    placeholder: 'Placeholder',
    autoComplete: 'address-level1',
    required: true,
    messages: REQUIRED,
  },
  {
    name: 'postalCode',
    label: 'Postal code',
    placeholder: 'Placeholder',
    autoComplete: 'postal-code',
    required: true,
    pattern: '[A-Za-z0-9 -]{3,12}',
    messages: {
      ...REQUIRED,
      patternMismatch: 'Enter a valid postal code',
    },
  },
];

export const NEW_CARD_FIELDS: FieldConfig[] = [
  {
    name: 'cardName',
    label: 'Full name on card',
    placeholder: 'Placeholder',
    autoComplete: 'cc-name',
    required: true,
    messages: REQUIRED,
    span: "full",
  },
  {
    name: 'cardNumber',
    label: 'Card number',
    inputMode: 'numeric',
    placeholder: 'Placeholder',
    autoComplete: 'cc-number',
    maxLength: 19,
    required: true,
    validate: (value) =>
      /^\d{16}$/.test(value.replace(/\s/g, '')) ? '' : 'Card number must be 16 digits',
    messages: REQUIRED,
    span: "full",
  },
  {
    name: 'expiry',
    label: 'Expiration date',
    placeholder: 'MM/YY',
    autoComplete: 'cc-exp',
    maxLength: 5,
    required: true,
    pattern: '(0[1-9]|1[0-2])/[0-9]{2}',
    messages: {
      ...REQUIRED,
      patternMismatch: 'Use the MM/YY format',
    },
    span: 2,
  },
  {
    name: 'cvv',
    label: 'CVV',
    inputMode: 'numeric',
    placeholder: 'Placeholder',
    maxLength: 4,
    autoComplete: 'cc-csc',
    required: true,
    pattern: '[0-9]{3,4}',
    messages: {
      ...REQUIRED,
      patternMismatch: 'CVV must be 3 or 4 digits',
    },
  },
];
