import type { Metadata } from "next";

import "./globals.css";
import { Providers } from "@/store/Providers";

import { inter } from "@/config/fonts";
import ProvidersClient from "./providerClient";

export const metadata: Metadata = {
  title: "Tienda Obis",
  description: "Explora nuestra amplia gama de productos filtrados por categoría, precio y más.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <div className=" bg-stone-50">
            <ProvidersClient>
              {children}
            </ProvidersClient>
          </div>
        </Providers>
      </body>
    </html>
  );
}
