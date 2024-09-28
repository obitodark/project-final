"use client"
import { CarouselCustom, Grid, MessageError, Thumbnailimage } from '@/components/custom';
import { Box } from '@/components/custom/Box';
import { Title } from '@/components/custom/Title';
import { CardDialog } from '@/components/features/dialog';
import { QuantitySelector } from '@/components/features/product';
import { Button } from '@/components/ui/button';
import { titleFont } from '@/config/fonts';
import { useBoolean } from '@/hook/useBoolean';
import type { APIResponseProduct, Products, ResponseJwt } from '@/interface';
import { getToken, validateAuthUser } from '@/utils/authService';
import { getRequest, postRequest } from '@/utils/http';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { jwtDecode } from 'jwt-decode';
import { useEffect, useState } from 'react';



interface Props {
  params: {
    slug: string
  }
}
interface DataProduct {
  idUser: number;
  product: QuantityProduct;

}
interface QuantityProduct {
  productId: number | undefined;
  quantity: number;
}

export default function ProductSlugPage({ params }: Props) {
  const [state, setImage] = useState(0)
  const [isOpenDialog, isCloseDialog, stateDialog,] = useBoolean()
  const [count, setCount] = useState(1)
  const queryClient = useQueryClient();
  const [error, setError] = useState<any>(null)
  const { slug } = params


  const { data: product = undefined } = useQuery({
    queryKey: ['product'],
    queryFn: async () => {
      return (await getRequest<APIResponseProduct>(`/product/slug/${slug}`)).data?.result || undefined;
    },
  });

  const mutationAdd = useMutation({
    mutationFn: async (dataProduct: DataProduct) => {
      const { state } = await postRequest(`/cart/${dataProduct.idUser}/add`, dataProduct.product, true)
      state !== 201 ? setError(" Stock no disponible") : setError(null)
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['cart'] })
    ,
  });
  const handlerAdd = (value: number) => setCount(value);
  const handlerReduce = (value: number) => setCount(value);


  const handlerAddItem = () => {
    const token = getToken()
    if (token) {
      const idUser = validateAuthUser(token);
      if (idUser) {
        mutationAdd.mutate({
          idUser: idUser,
          product: {
            productId: product && product.id,
            quantity: count
          }
        })
      }
    }
    isCloseDialog()
  }

  return (
    <Grid container spacing={{ xs: 3 }} cols={{ xs: 1, lg: 3 }}
      className=' my-20 '>
      <Grid item span={{ xs: 1, lg: 3 }}>
        <Title
          title='Detalle de Articulo'
          subtitle='Caracteristicas y epecificaciones'
          className='p-3'
        />
      </Grid>

      {product && <CardDialog
        state={stateDialog}
        onClose={isCloseDialog}
        price={product?.price}
        quantity={count}
        image={product?.images[0] ? product.images[0].url : ""}
        name='cme Prism T-Shirt'
        brand={product.brand.name}
        onAdd={handlerAddItem}
      />}
      <Grid item span={{ xs: 1, lg: 2 }} className='flex flex-col lg:flex-row-reverse gap-3 ' >
        <CarouselCustom
          images={product?.images ? product.images : []}
          value={state} />
        <Box className='flex pl-0 lg:pl-3 lg:flex-col gap-3 mt-5 justify-center'>
          {product?.images && product?.images.map((image, index) => (
            <Thumbnailimage
              key={image.id}
              index={index}
              image={image}
              indexcurrent={state}
              onClick={() => setImage(index)}
            />
          ))}
        </Box>
      </Grid>
      <Grid item span={{ xs: 1 }} className='px-5 '>
        <div className='flex flex-col'>
          <h1 className={`${titleFont.className} antialiased font-bold text-xl `}>
            {product?.name}
          </h1>
          <span className=' mb-12 text-lg block  '>Nike</span>

          {/* <SizeSelector
            selectSize={product.sizes[0]}
            availableSize={product.sizes} /> */}
          <QuantitySelector
            quantity={1}
            onAdd={handlerAdd}
            onReduce={handlerReduce}
          />

          <Box className='flex flex-col  mt-10 gap-2'>
            <span className='  text-xl  font-bold '>
              PEN {product?.price}
            </span>
            {error && <MessageError message={error} />}
            <Button className='w-[200px] '
              onClick={isOpenDialog}>
              Añadir al carrito
            </Button>
          </Box>

          <h3 className='font-bold text-sm mt-5'>Descripción</h3>
          <p className='font-light'>
            {product?.description}
          </p>
        </div>
      </Grid>
    </Grid>
  );
}
