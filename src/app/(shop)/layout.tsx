import type { Metadata } from "next";
import { Providers } from "@/store/Providers";
import { Footer, Header } from "@/components/layout";

export const metadata: Metadata = {
  title: "tienda Obis",
  description: "tienda Obis",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (

    <Providers>
      <Header />
      <div className="px-0 2xl:px-56 bg-stone-50">
        {children}
      </div>
      <Footer />
    </Providers>

  );
}
