"use client"
import Link from "next/link";
import Image from "next/image";
import { Grid } from "@/components/custom";
import { Title } from "@/components/custom/Title";
import { useQuery } from "@tanstack/react-query";
import { getRequest, postRequest } from "@/utils/http";
import type { APIResponseCard, Cart } from "@/interface";
import { Box } from "@/components/custom/Box";
import type { APIPayment } from "@/interface/payament.nterface";
import { getToken, validateAuthUser } from "@/utils/authService";
import { Button } from "@/components/ui/button";


export default function CheckoutPage() {
  const { data: cart = null } = useQuery<Cart>({
    queryKey: ['cart'],
    queryFn: async () => {
      return (await getRequest<APIResponseCard>("/cart/byUser", true)).data?.result || null;
    },
  });

  const handlerPayProduct = async () => {
    const token = getToken()
    if (token) {
      const idUser = validateAuthUser(token);
      const { data, state } = await postRequest<APIPayment>(`/payment/${idUser}`, null, true)
      if (state === 201) {
        window.open(`${data.result}`, '_blank');
      }
    }
  }

  const totalQuantity = cart && cart.cartItems.filter(item => item.status == "SELECTED").reduce((total, item) => total + item.quantity, 0);

  return (
    <Box className=" flex  justify-center items-center mb-72 px-3">
      <Box className="flex flex-col  ">
        <Title title="Verificar Orden" />
        <Grid container cols={{ xs: 1, md: 2 }} spacing={{ xs: 10 }}>
          <Grid item
            className="flex flex-col mt-5">
            <span className="text-xl">Ajusta Elementos</span>
            <Link href={"/cart"} className="underline mb-3">
              Editar carrito</Link>
            {cart?.cartItems.filter(item => item.status == "SELECTED").map(product => (
              <Box key={product.id} className="flex mb-5 border p-3 rounded-md">
                <Image src={`${product.product.images[0].url}`}
                  width={100}
                  height={100}
                  alt={`${product.product.name}`}
                  className="mr-5 rounded"
                  style={{
                    width: "120px",
                    height: "120px"
                  }}
                />
                <Box>
                  <p className="line-clamp-2">{product.product.name}</p>
                  <p>precio :{product.priceUnitary} (x{product.quantity})</p>
                  <p className="font-bold">Subtotal : PEN {product.price.toFixed(2)}</p>
                </Box>
              </Box>
            ))
            }
          </Grid>
          <Grid item className="bg-white rounded-xl shadow-xl p-7">
            <h2 className="text-2xl mb-2.5 font-bold">Direccion de entrega</h2>
            <Box className="mb-10">
              <p className="text-xl">{cart && cart?.user.name} {cart && cart?.user.lastName}</p>
              <p>{cart && cart.user.email}</p>
              <p>{cart && cart.user.address.department} / {cart && cart.user.address.province}/ {cart && cart.user.address.district}</p>
              <p>{cart && cart.user.address.address}</p>
            </Box>
            <h2 className="text-2xl mb-2">Resumen de order</h2>
            <Grid container cols={{ xs: 2 }}>
              <span>Nro. Product</span>
              <span className="text-right">{totalQuantity} articulos</span>
              <span>Subtotal</span>
              <span className="text-right">PEN  {cart && cart.totalPrice.toFixed(2)}</span>
              <span>Impuestos (15%)</span>
              <span className="text-right">PEN  --</span>
              <span className="mt-5 text-2xl">Total</span>
              <span className=" mt-5 text-right">PEN  {cart && cart.totalPrice.toFixed(2)}
              </span>
            </Grid>
            <Box>
              <p className="mb-5">
                {/* Disclaimer */}
                <span className="text-xs">
                  Al hacer clic en &quot;Colocar orden&quot;, aceptas nuestros <a href="#" className="underline">términos y condiciones</a> y <a href="#" className="underline">política de privacidad</a>
                </span>
              </p>
              <Button
                className="w-full"
                onClick={handlerPayProduct}>
                pagar
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  )
}
