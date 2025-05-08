// src/app/api/stripe/checkout/route.ts
import { stripe } from "@/lib/stripe";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { cart, redirectBase } = await req.json();

  const line_items = cart.map((item: any) => ({
    price_data: {
      currency: item.currency,
      unit_amount: item.price,
      product_data: { name: item.name },
    },
    quantity: item.quantity,
  }));

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    line_items,
    automatic_tax: { enabled: true },
    success_url: `${redirectBase}/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${redirectBase}/checkout`,
    shipping_address_collection: { allowed_countries: ["US", "CA"] },
    // Let Stripe collect the customer’s email on the Checkout page:
    customer_email: "ctan.dev@gmail.com",
  });

  return NextResponse.json({ url: session.url });
}
