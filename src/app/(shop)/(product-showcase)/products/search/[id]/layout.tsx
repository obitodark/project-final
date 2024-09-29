import { Box } from "@/components/custom/Box";
import { BoxShowcase } from "@/components/layout";
import type { Metadata } from "next";



export const metadata: Metadata = {
  title: "Tienda obis",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (

    <Box className="flex flex-col justify-center ">
      {/* <BoxShowcase > */}
      {children}
      {/* </BoxShowcase> */}
    </Box>

  );
}
