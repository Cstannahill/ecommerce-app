// src/app/(store)/success/page.tsx
import { stripe } from "@/lib/stripe";
import { notFound } from "next/navigation";
import Link from "next/link";
import Stripe from "stripe";

type SuccessPageProps = {
  searchParams: Promise<{ session_id?: string }>;
};

export default async function SuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ session_id: string }>;
}) {
  const { session_id: sessionId } = await searchParams;
  if (!sessionId) return notFound();

  // Retrieve the Checkout Session, including line items and expanded product data
  const session = await stripe.checkout.sessions.retrieve(sessionId, {
    expand: ["line_items.data.price.product"],
  });

  if (!session || session.payment_status !== "paid") {
    // If not paid, or session missing, show 404
    return notFound();
  }

  const lineItems = session.line_items!;
  const customer = session.customer_details;

  return (
    <div className="max-w-2xl mx-auto space-y-8 py-12">
      <h1 className="text-3xl font-bold">Thank you for your order!</h1>
      {customer?.email && (
        <p>
          A receipt has been sent to <strong>{customer.email}</strong>.
        </p>
      )}

      <div className="rounded-lg border p-6">
        <h2 className="mb-4 text-xl font-semibold">Order summary</h2>
        <ul className="space-y-4">
          {lineItems.data.map((item) => {
            const price = item.price as Stripe.Price;
            const product = price.product as Stripe.Product;

            return (
              <li key={item.id} className="flex justify-between">
                <div>
                  <p className="font-medium">{product.name}</p>
                  <p className="text-sm text-muted-foreground">
                    Quantity: {item.quantity}
                  </p>
                </div>
                <span className="font-semibold">
                  {new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: price.currency ?? "USD",
                  }).format((price.unit_amount! * item.quantity!) / 100)}
                </span>
              </li>
            );
          })}
        </ul>

        <div className="mt-6 flex justify-between border-t pt-4">
          <span className="font-medium">Total paid</span>
          <span className="font-bold">
            {new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: session.currency || undefined,
            }).format((session.amount_total ?? 0) / 100)}
          </span>
        </div>
      </div>

      <Link href="/" className="inline-block">
        <button className="rounded bg-primary px-6 py-2 font-medium text-white hover:bg-primary-foreground">
          Continue Shopping
        </button>
      </Link>
    </div>
  );
}
