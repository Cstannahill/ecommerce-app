import Stripe from "stripe";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  // apiVersion: "2023-10-16",
});
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(req: Request) {
  const header = await headers();
  const sig = header.get("stripe-signature")!;
  const raw = await req.text();

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(raw, sig, endpointSecret);
  } catch (err) {
    return NextResponse.json(
      { error: (err as Error).message },
      { status: 400 }
    );
  }

  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object as Stripe.Checkout.Session;
      await prisma.order.create({
        data: {
          email: session.customer_email!,
          stripeId: session.id,
          amount: session.amount_total!,
          status: "PAID",
        },
      });
      break;
    }
    /* handle subscription events here */
    default:
      console.log(`Unhandled event ${event.type}`);
  }

  return NextResponse.json({ received: true });
}
