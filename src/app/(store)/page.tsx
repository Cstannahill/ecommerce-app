import { stripe } from "@/lib/stripe";
import ProductCard from "@/components/product/ProductCard";
import type { StripeProduct } from "@/types/stripe";
import Link from "next/link";
import { Button } from "@/components/ui/button";

async function getProducts(): Promise<StripeProduct[]> {
  const prices = await stripe.prices.list({
    limit: 50,
    active: true,
    expand: ["data.product"],
  });

  return prices.data.map((p) => ({
    id: p.id,
    name: (p.product as any).name,
    description: (p.product as any).description,
    image: (p.product as any).images?.[0] ?? null,
    unit_amount: p.unit_amount ?? 0,
    currency: p.currency,
  }));
}

export default async function HomePage() {
  const products = await getProducts();

  return (
    <>
      {/* Hero / Landing section */}
      <section className="mb-12 rounded-lg bg-gradient-to-r from-zinc-900 via-zinc-700 to-neutral-900 p-12 text-center text-white">
        <h1 className="text-4xl font-extrabold mb-4">
          Welcome to ShadyT's Digital Emporium
        </h1>
        <p className="max-w-2xl mx-auto mb-6">
          Discover unique digital assets and handcrafted physical goods. Browse
          our categories or dive straight into our offerings.
        </p>
        <div className="flex justify-center gap-4">
          <Link href="/categories/digital">
            <Button
              variant="outline"
              className="text-indigo-600  border-white hover:bg-white hover:text-sky-600"
            >
              Browse Digital
            </Button>
          </Link>
          <Link href="/categories/apparel">
            <Button className="bg-white text-sky-600 hover:text-indigo-600 hover:bg-gray-100">
              Shop Apparel
            </Button>
          </Link>
        </div>
      </section>

      {/* Product grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </>
  );
}
