// "use client";
// import { useState, useEffect, ReactNode } from "react";
// import {
//   Carousel,
//   CarouselContent,
//   CarouselItem,
//   CarouselNext,
//   CarouselPrevious,
//   type CarouselApi,
// } from "../ui/carousel";
// import { Card } from "@/components/ui/card";

// interface Props {
//   value?: number;
//   itemsToShow?: number; // Cantidad de items visibles en pantallas grandes
//   children: ReactNode; // Pasar el contenido como hijo
// }

// export const CarouselCustom = ({
//   value = 0,
//   itemsToShow = 1,
//   children,
// }: Props) => {
//   const [api, setApi] = useState<CarouselApi | null>(null);

//   useEffect(() => {
//     if (api && value >= 0) {
//       api.scrollTo(value);
//     }
//   }, [value, api]);

//   return (
//     <Carousel setApi={setApi} className="w-full p-0 m-0 overflow-x-hidden">
//       <CarouselContent className="flex">
//         {/* Renderizar directamente los hijos */}
//         {React.Children.map(children, (child, index) => (
//           <CarouselItem
//             key={index}
//             className={`w-full md:w-1/${itemsToShow} px-2`} // Responsivo, cambiar cantidad de items visibles
//           >
//             <Card className="h-full">{child}</Card>
//           </CarouselItem>
//         ))}
//       </CarouselContent>
//       <CarouselPrevious />
//       <CarouselNext />
//     </Carousel>
//   );
// };
