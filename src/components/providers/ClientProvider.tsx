"use client";
import { CartProvider } from "@/components/cart/cart-context";
import { SessionProvider } from "next-auth/react"; // if you’re using NextAuth
import CartDrawer from "../cart/CartDrawer";
import Link from "next/link";
import { ThemeProvider } from "next-themes";
import { Toaster } from "sonner";

export default function ClientProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SessionProvider>
      <CartProvider>
        <ThemeProvider
          attribute="class" // toggles .light / .dark on <html>
          defaultTheme="system" // respect OS preference by default
          enableSystem // update class when OS preference changes
        >
          {children}
          <Toaster position="top-right" />
        </ThemeProvider>
      </CartProvider>
    </SessionProvider>
  );
}
