import { Box } from "@/components/custom/Box";
import { BoxShowcase } from "@/components/layout";
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Filtrar Productos - Tienda obis",
  description: "Explora nuestra amplia gama de productos filtrados por categoría, precio y más.",
  keywords: "productos, filtrado, tienda, categoría, precio, comprar, ecommerce",

};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (

    <Box className="flex flex-col justify-center ">
      <BoxShowcase >
        {children}
      </BoxShowcase>
    </Box>

  );
}
