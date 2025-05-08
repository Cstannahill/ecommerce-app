// types/shipping.ts
export type Address = { country: string; postalCode: string };
export type Rate = {
  service: string;
  provider: string;
  amount: number;
  estimatedDays: number;
};
