export type Rule = (value: string, all: Record<string, string>) => string | null;

export const rules = {
  required:
    (message = "This field is required"): Rule =>
    (value) =>
      value.trim() ? null : message,

  email:
    (message = "Enter a valid email address"): Rule =>
    (value) =>
      /^\S+@\S+\.\S+$/.test(value.trim()) ? null : message,

  password:
    (
      message = "Password should be at least 8 characters long and contain at least a letter, a number, and a symbol."
    ): Rule =>
    (value) =>
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,}$/.test(value) ? null : message,

  matches:
    (field: string, message = "Passwords do not match"): Rule =>
    (value, all) =>
      value === all[field] ? null : message,

  cardNumber:
    (message = "Enter a 16-digit card number"): Rule =>
    (value) =>
      /^\d{16}$/.test(value.replace(/\s/g, "")) ? null : message,

  expiry:
    (message = "Use the MM/YY format"): Rule =>
    (value) =>
      /^(0[1-9]|1[0-2])\/\d{2}$/.test(value.trim()) ? null : message,

  cvv:
    (message = "Enter 3 or 4 digits"): Rule =>
    (value) =>
      /^\d{3,4}$/.test(value.trim()) ? null : message,
};

export type Schema<T> = Partial<Record<keyof T, Rule[]>>;
export type Errors<T> = Partial<Record<keyof T, string>>;

export function validate<T extends Record<string, string>>(values: T, schema: Schema<T>): Errors<T> {
  const errors: Errors<T> = {};

  for (const key in schema) {
    for (const rule of schema[key] ?? []) {
      const error = rule(values[key] ?? "", values);
      if (error) {
        errors[key] = error;
        break;
      }
    }
  }

  return errors;
}
