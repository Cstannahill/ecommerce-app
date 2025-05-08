"use client";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useCart } from "@/components/cart/cart-context";
import type { StripeProduct } from "@/types/stripe";
import { toast } from "sonner";
import { Plus } from "lucide-react";

type Props = { product: StripeProduct };

export default function ProductCard({ product }: Props) {
  const { addItem } = useCart();
  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.unit_amount,
      currency: product.currency,
      image: product.image,
      quantity: 1,
    });
    const plusIcon = <Plus size={16} className="mr-2" />;
    toast.success(`Added ${product.name} to cart`, {
      style: { color: "green" },
      description: "You can view your cart in the drawer",
      action: {
        label: "View cart",
        onClick: () => {
          // Open the cart drawer
          const cartDrawer = document.querySelector("#cart-trigger");
          if (cartDrawer) {
            (cartDrawer as HTMLButtonElement).click();
          }
        },
      },
    });
  };
  return (
    <div
      className={cn(
        "rounded-lg border bg-card p-4 transition-shadow hover:shadow-lg"
      )}
    >
      <Image
        src={product.image || "/placeholder.webp"}
        alt={product.name}
        width={400}
        height={400}
        className="aspect-square w-full rounded-md object-cover"
      />
      <div className="mt-3 flex flex-col gap-1">
        <h3 className="text-lg font-medium">{product.name}</h3>
        <p className="text-muted-foreground line-clamp-2">
          {product.description}
        </p>
        <span className="text-lg font-bold">
          {Intl.NumberFormat("en-US", {
            style: "currency",
            currency: product.currency,
          }).format(product.unit_amount / 100)}
        </span>

        <Button
          className="mt-2 w-full place-self-end"
          onClick={handleAddToCart}
        >
          Add to cart
        </Button>
      </div>
    </div>
  );
}
