// src/components/layout/NavbarClient.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import CartDrawer from "@/components/cart/CartDrawer";
import { cn } from "@/lib/utils";
import Image from "next/image";
import storeLogo from "@/public/resources/shadystore.png";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { Menu } from "lucide-react";

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

        {/* Desktop nav */}
        <ul className="hidden md:flex gap-8">
          <li>
            <Link
              href="/"
              className={cn(
                "hover:text-primary transition-colors",
                path === "/" && "text-primary"
              )}
            >
              Home
            </Link>
          </li>
          {categories.map((slug) => {
            const href = `/categories/${slug}`;
            const label = slug.charAt(0).toUpperCase() + slug.slice(1);
            return (
              <li key={slug}>
                <Link
                  href={href}
                  className={cn(
                    "hover:text-primary transition-colors",
                    path === href && "text-primary"
                  )}
                >
                  {label}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Right side: cart + mobile menu */}
        <div className="flex items-center gap-2">
          <CartDrawer />

          {/* Mobile menu button */}
          <Sheet>
            <SheetTrigger asChild>
              <button className="md:hidden p-2 rounded hover:bg-muted">
                <Menu size={24} />
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="w-64 p-4">
              <h2 className="mb-4 text-lg font-semibold">Categories</h2>
              <ul className="flex flex-col gap-2">
                <li>
                  <Link
                    href="/"
                    className={cn(
                      "block py-2 px-3 rounded hover:bg-accent",
                      path === "/" && "bg-accent text-accent-foreground"
                    )}
                  >
                    Home
                  </Link>
                </li>
                {categories.map((slug) => {
                  const href = `/categories/${slug}`;
                  const label = slug.charAt(0).toUpperCase() + slug.slice(1);
                  return (
                    <li key={slug}>
                      <Link
                        href={href}
                        className={cn(
                          "block py-2 px-3 rounded hover:bg-accent",
                          path === href && "bg-accent text-accent-foreground"
                        )}
                      >
                        {label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
}
