import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { CartProvider } from "@/components/cart/cart-context";
import { SessionProvider } from "next-auth/react"; // if you’re using NextAuth
import "./globals.css";
import ClientProvider from "@/components/providers/ClientProvider";
import Link from "next/link";
import CartDrawer from "@/components/cart/CartDrawer";
import Navbar from "@/components/layout/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ShadyT's Digital Emporium",
  description: "Your one-stop shop for all things digital!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ClientProvider>
          <Navbar />
          <main>{children}</main>
        </ClientProvider>
      </body>
    </html>
  );
}
