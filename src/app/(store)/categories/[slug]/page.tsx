// src/app/(store)/categories/[slug]/page.tsx
import { stripe } from "@/lib/stripe";
import Stripe from "stripe";
import ProductCard from "@/components/product/ProductCard";
import type { StripeProduct } from "@/types/stripe";
import { notFound } from "next/navigation";

type Props = { params: Promise<{ databaseId: string }> };

// Fetch all active prices, then filter by product.metadata.category
async function getProductsByCategory(slug: string): Promise<StripeProduct[]> {
  const prices = await stripe.prices.list({
    limit: 100,
    active: true,
    expand: ["data.product"],
  });

  return prices.data
    .filter((price) => {
      const prod = price.product as Stripe.Product & {
        metadata?: Record<string, string>;
      };
      return prod.metadata?.category === slug;
    })
    .map((price) => {
      const prod = price.product as Stripe.Product;
      return {
        id: price.id,
        name: prod.name,
        description: prod.description,
        image: prod.images?.[0] ?? null,
        unit_amount: price.unit_amount ?? 0,
        currency: price.currency ?? "USD",
      };
    });
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const products = await getProductsByCategory(slug);

  if (products.length === 0) {
    // No such category or no products → 404
    notFound();
  }

  // Title-case the slug for display: e.g. "digital" → "Digital"
  const title = slug.charAt(0).toUpperCase() + slug.slice(1);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">{title}</h1>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
}
