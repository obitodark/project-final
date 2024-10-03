"use client"
import Link from "next/link";
import { Grid } from "@/components/custom";
import { ProductItemCard } from "@/components/features/product";
import { Title } from "@/components/custom/Title";
import { Box } from "@/components/custom/Box";
import { useQuery } from "@tanstack/react-query";
import type { APIResponseCard, Cart } from "@/interface";
import { getRequest } from "@/utils/http";
import Image from "next/image";


export default function CartPage() {

  const { data: cart = null } = useQuery<Cart>({
    queryKey: ['cart'],
    queryFn: async () => {
      return (await getRequest<APIResponseCard>("/cart/byUser", true)).data?.result || null;
    },
  });
  const totalQuantity = cart && cart.cartItems.filter(item => item.status == "SELECTED").reduce((total, item) => total + item.quantity, 0);
  const idUser = cart && cart?.user.id;

  return (
    <Box
      className=" flex  justify-center items-center pb-72 px-3">
      <Box className="flex flex-col ">
        <Title title="Carrito" subtitle="Agregar mas item" />
        <Link href={"/"} className="underline text-sm hover:text-indigo-500">
          Continua comprando</Link>
        <Grid container cols={{ xs: 1, md: 2 }} spacing={{ xs: 10 }}>
          <Grid item span={{ xs: 1 }}
            className="flex flex-col mt-5">
            {cart?.cartItems && cart.cartItems?.length > 0
              ? cart.cartItems.map((cartItem) => (
                <ProductItemCard
                  key={cartItem.id}
                  products={cartItem.product}
                  quantity={cartItem.quantity}
                  value={cartItem.status === "SELECTED" ? true : false}
                  idUser={idUser ? idUser : 0}
                />
              ))
              : <Box className="flex flex-col justify-center items-center">
                <h5 className={` w-full  font-semibold text-xl
                `} > Sin Articulos en el Carrito</h5>
                <Image src={"/imgs/cart-empty.png"} width={100} height={100} alt="image-empty" />
              </Box>}
          </Grid>
          <Grid item span={{ xs: 1, md: 1 }} className="bg-gray-100 border rounded-xl p-7 h-fit w-full">
            <h2 className="text-2xl mb-2">Resumen de Carrito</h2>
            <Grid container cols={{ xs: 2 }}>
              <span className="text-sm">Nro. Product</span>
              <span className="text-right text-sm">{totalQuantity} articulos</span>
              <span className="text-sm">Subtotal</span>
              <span className="text-right text-sm">{cart && cart.totalPrice.toFixed(2)}</span>
              <span className="text-sm">Impuestos (15%)</span>
              <span className="text-right text-sm">- -</span>
              <span className="mt-5 text-xl">Total</span>
              <span className="mt-5 text-right font-semibold">
                PEN {cart && cart.totalPrice.toFixed(2)}
              </span>
            </Grid>
            <Box className="mt-3">
              <Link
                className="flex justify-center bg-indigo-600 text-white p-1 rounded-md text-sm"
                href={`${cart?.user.address ? "/checkout" : "/checkout/address"}`}>
                Siguiente
              </Link>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  )
}
