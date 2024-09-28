import { Box } from '@/components/custom/Box';
import { DialogCustom } from '@/components/custom/DialogCustom'
import { Title } from '@/components/custom/Title';
import { Button } from '@/components/ui/button';
import { deleteRequest } from '@/utils/http';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import React from 'react'


interface Props {
  state: boolean;
  onClose: () => void;
  idUser: number;
  idProduct: number;
}
interface Data {
  idUser: number;
  idProduct: number;

}

export const ShoppingcartDialog = ({ state, onClose, idProduct, idUser }: Props) => {

  const queryClient = useQueryClient();
  const mutationRemove = useMutation({
    mutationFn: async (data: Data) => {
      await deleteRequest(`/cart/${data.idUser}/remove?productId=${data.idProduct}`, true);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
  });

  const handlerRemoveItem = () => {
    mutationRemove.mutate({ idUser, idProduct })
    onClose()
  }
  return (
    <DialogCustom state={state} onClose={onClose}>

      <Box>
        <Title
          title='Quitar artículo'
          subtitle='¿Estás seguro de que quieres eliminar el artículo de tu cesta?'
          className='mt-0'
        />
        <Box className='w-full sm:w-auto'>
          <Button className='w-full'
            onClick={handlerRemoveItem}
          >
            Quitar
          </Button>
          <Button onClick={onClose} className='w-full' variant={"ghost"}>
            Cancelar
          </Button>
        </Box>
      </Box>
    </DialogCustom>
  )
}

