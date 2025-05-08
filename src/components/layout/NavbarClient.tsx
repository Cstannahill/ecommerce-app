// src/components/layout/NavbarClient.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import CartDrawer from "@/components/cart/CartDrawer";
import { cn } from "@/lib/utils";
import Image from "next/image";
import storeLogo from "@/public/resources/shadystore.png";

type Props = { categories: string[] };

export default function NavbarClient({ categories }: Props) {
  const path = usePathname();

  return (
    <header className="border-b bg-background">
      <nav className="container mx-auto flex items-center justify-between py-4 px-6">
        <Link href="/" className="text-2xl font-bold">
          <Image
            src="/shadystore.png"
            alt="Logo"
            width={40}
            height={40}
            className="inline-block mr-2 rounded-2xl"
          />
          ShadyT's Digital Emporium
        </Link>

        <ul className="hidden md:flex gap-8">
          <li>
            <Link
              href="/"
              className={cn(
                "hover:text-primary transition-colors",
                path === "/" && "text-primary font-semibold"
              )}
            >
              Home
            </Link>
          </li>

          {categories.map((slug) => {
            const label = slug.charAt(0).toUpperCase() + slug.slice(1);
            const href = `/categories/${slug}`;

            return (
              <li key={slug}>
                <Link
                  href={href}
                  className={cn(
                    "hover:text-primary transition-colors",
                    path === href && "text-primary font-semibold"
                  )}
                >
                  {label}
                </Link>
              </li>
            );
          })}
        </ul>

        <CartDrawer />
      </nav>
    </header>
  );
}
