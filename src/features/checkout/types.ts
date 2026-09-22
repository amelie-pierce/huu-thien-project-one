export type CheckoutValues = {
  email: string;
  name: string;
  phone: string;
  country: string;
  address1: string;
  address2: string;
  city: string;
  state: string;
  postalCode: string;
  cardName: string;
  cardNumber: string;
  expiry: string;
  cvv: string;
};

export type SavedCard = {
  id: string;
  brand: string;
  last4: string;
  expiry: string;
};