export type StripeProduct = {
  id: string;
  name: string;
  description: string | null;
  image: string | null;
  unit_amount: number;
  currency: string;
};
