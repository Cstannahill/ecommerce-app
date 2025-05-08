"use client";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { useCart } from "./cart-context";
import Link from "next/link";
import Image from "next/image";

export default function CartDrawer() {
  const { items, removeItem } = useCart();
  const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0);

  return (
    <Sheet>
      <SheetTrigger
        id="cart-trigger"
        asChild
        className="hover:border hover:border-blue-500"
      >
        <Button variant="ghost" size="icon" aria-label="Open cart" className="">
          <ShoppingCart strokeWidth={3} size={28} className="" color="green" />
          {items.length > 0 && (
            <span className="relative bottom-2 flex p-1 px-1.5 items-center justify-center rounded-full bg-primary text-[.5rem] text-primary-foreground">
              {items.length}
            </span>
          )}
        </Button>
      </SheetTrigger>

      <SheetContent side="right" className="w-80 p-4">
        <h2 className="mb-4 text-lg font-semibold">Cart</h2>

        {items.length === 0 ? (
          <p className="text-muted-foreground">Your cart is empty.</p>
        ) : (
          <ul className="flex flex-col gap-4">
            {items.map((item) => (
              <li
                key={item.id}
                className="flex flex-col space-y-2 rounded-md border p-2"
              >
                {/* row 1: the image */}
                {item.image && (
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={80}
                    height={80}
                    className="mx-auto rounded-sm object-cover"
                  />
                )}

                {/* row 2: name & quantity */}
                <div className="text-sm font-medium">
                  {item.name} × {item.quantity}
                </div>

                {/* row 3: remove button */}
                <Button
                  variant="link"
                  size="sm"
                  onClick={() => removeItem(item.id)}
                  className="text-destructive self-start"
                >
                  Remove
                </Button>
              </li>
            ))}
            <li className="mt-2 text-right text-lg font-bold">
              {Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
              }).format(total / 100)}
            </li>
          </ul>
        )}

        {items.length > 0 && (
          <Link href="/checkout" className="mt-6 block">
            <Button className="w-full">Checkout</Button>
          </Link>
        )}
      </SheetContent>
    </Sheet>
  );
}
