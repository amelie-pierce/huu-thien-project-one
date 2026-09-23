import { FieldConfig } from '@/components/ui';

const PASSWORD_PATTERN = '(?=.*[A-Za-z])(?=.*\\d)(?=.*[^A-Za-z\\d]).{8,}';

const EMAIL_FIELD: FieldConfig = {
  name: 'email',
  label: 'Email',
  type: 'email',
  placeholder: 'name@gmail.com',
  autoComplete: 'email',
  required: true,
  messages: {
    valueMissing: 'Please enter your email',
    typeMismatch: 'Please enter a valid email',
  },
};

export const SIGN_IN_FIELDS: FieldConfig[] = [
  EMAIL_FIELD,
  {
    name: 'password',
    label: 'Password',
    type: 'password',
    placeholder: 'Enter your password',
    autoComplete: 'current-password',
    required: true,
    messages: { valueMissing: 'Please enter your password' },
  },
];

export const SIGN_UP_FIELDS: FieldConfig[] = [
  EMAIL_FIELD,
  {
    name: 'password',
    label: 'Password',
    type: 'password',
    placeholder: 'Enter a password',
    autoComplete: 'new-password',
    required: true,
    pattern: PASSWORD_PATTERN,
    messages: {
      valueMissing: 'Please enter a password',
      patternMismatch:
        'Password should be at least 8 characters long and contain at least a letter, a number, and a symbol.',
    },
  },
  {
    name: 'confirmPassword',
    label: 'Confirm Password',
    type: 'password',
    placeholder: 'Re-enter Password',
    autoComplete: 'new-password',
    required: true,
    validate: (value, form) => {
      const password = form?.querySelector<HTMLInputElement>('input[name="password"]');
      if (!password) return '';
      return password.value === value ? '' : 'Passwords do not match';
    },
    messages: { valueMissing: 'Please confirm your password' },
  },
];
