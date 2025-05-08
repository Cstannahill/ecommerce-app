// src/components/layout/Navbar.tsx
import NavbarClient from "./NavbarClient";
import { stripe } from "@/lib/stripe";

// Fetch unique category slugs from your Stripe Products
async function getCategories(): Promise<string[]> {
  const products = await stripe.products.list({
    active: true,
    limit: 100,
  });

  const cats = new Set<string>();
  for (const prod of products.data) {
    const cat = prod.metadata?.category;
    if (cat) cats.add(cat);
  }
  return Array.from(cats);
}

export default async function Navbar() {
  const categories = await getCategories();
  return <NavbarClient categories={categories} />;
}
