"use client";
import { useCart } from "@/components/cart/cart-context";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CheckoutPage() {
  const { items, clear } = useCart();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  if (items.length === 0) return <p>Your cart is empty.</p>;

  const handleCheckout = async () => {
    setLoading(true);
    const { url } = await fetch("/api/stripe/checkout", {
      method: "POST",
      body: JSON.stringify({
        cart: items,
        redirectBase: window.location.origin,
      }),
    }).then((r) => r.json());

    clear();
    router.push(url);
  };

  return (
    <div className="max-w-md mx-auto space-y-6">
      <h1 className="text-2xl font-semibold">Checkout</h1>
      <ul className="divide-y rounded-md border">
        {items.map((i) => (
          <li key={i.id} className="flex justify-between p-2">
            {i.name} × {i.quantity}
            <span>
              {new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: i.currency,
              }).format((i.price * i.quantity) / 100)}
            </span>
          </li>
        ))}
      </ul>
      <Button
        onClick={() => console.log("click")}
        disabled={true}
        className="w-full"
      >
        {loading ? "Redirecting…" : "Pay with Stripe"}
      </Button>
    </div>
  );
}
