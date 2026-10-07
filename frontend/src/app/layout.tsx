import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Moneta Pay",
  description: "Gasless subscription infrastructure for web3 businesses.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
