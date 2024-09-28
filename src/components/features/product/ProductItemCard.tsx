"use client"
import Image from 'next/image'
import React, { useState } from 'react'
import { Box } from '../../custom/Box'
import { QuantitySelector } from './QuantitySelector'
import { Checkbox } from '../../ui/checkbox';
import { RiDeleteBin6Line } from "react-icons/ri";
import type { Product } from '@/interface';
import { postRequest, putRequest } from '@/utils/http';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useBoolean } from '@/hook/useBoolean'
import { ShoppingcartDialog } from '../dialog'
import { Button } from '@/components/ui/button'
interface Props {
  products: Product;
  quantity: number;
  value: boolean;
  idUser: number;
}
interface Data {
  idUserItem?: number;
  idProductItem: number;
}
interface DataProduct {
  idUser: number;
  product: QuantityProduct;

}
interface QuantityProduct {
  productId: number;
  quantity: number;
}

export const ProductItemCard = ({ products, quantity, value = false, idUser }: Props) => {
  const [isChecked, setIsChecked] = useState(value);
  const queryClient = useQueryClient();
  const [openDialog, closeDialog, stateDialog] = useBoolean()


  const mutationUpdate = useMutation({
    mutationFn: async (data: Data) => putRequest(`/cartItem/update?idUser=${data.idUserItem}&idProduct=${data.idProductItem}`, null, true),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['cart'] }),
  });

  const mutationUpdateAdd = useMutation({
    mutationFn: async (data: DataProduct) => postRequest(`/cart/${data.idUser}/add`, data.product, true),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['cart'] })
    ,
  });

  const mutationUpdateReduce = useMutation({
    mutationFn: (data: Data) => putRequest(`/cart/reduceQuantity/${data.idProductItem}`, null, true),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['cart'] }),
  });

  const handlerReduce = () => {
    mutationUpdateReduce.mutate({ idProductItem: products.id })
  }
  const handlerAdd = () => {
    mutationUpdateAdd.mutate(
      {
        idUser: idUser,
        product: {
          productId: products.id,
          quantity: 1
        }
      }
    )
  }
  const handlerUpdateStateItem = (checked: boolean) => {
    setIsChecked(checked);
    mutationUpdate.mutate({ idProductItem: products.id, idUserItem: idUser });
  }

  return (
    <Box className="flex mt-3 p-2 rounded-md  relative border items-center ">
      <ShoppingcartDialog state={stateDialog} idProduct={products.id} idUser={idUser} onClose={closeDialog} />
      <Checkbox className='mx-2'
        checked={isChecked}
        onCheckedChange={handlerUpdateStateItem}
      />
      <Image src={`${products.images[0].url}`}
        width={100}
        height={100}
        alt={`${name}`}
        className="mr-5 rounded"

        style={{
          width: "120px",
          height: "120px"
        }}
      />
      <Box className="flex flex-col gap-1 w-full justify-between ">
        <Box>
          <p className="text-sm mt-6 line-clamp-2">{products.name}</p>
          <p className="text-sm font-semibold  line-clamp-2  text-gray-500" >{products.brand.name}</p>
        </Box>
        <Box className="flex w-full justify-between r mb-2">
          <p className=" text-xs md:text-sm font-semibold">PEN {products.price}</p>
          <QuantitySelector quantity={quantity}
            onAdd={handlerAdd}
            onReduce={handlerReduce}
          />
        </Box>
      </Box>
      <Button variant={"ghost"} onClick={openDialog} className="absolute top-0 right-0 underline  text-sm hover:text-indigo-700">
        <RiDeleteBin6Line size={18} />
      </Button>
    </Box>
  )
}

