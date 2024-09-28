
import { Form } from '../../ui/form'
import { FormFieldCustom, Grid } from '../../custom'
import { InputText } from '../../custom/InputText'
import { Button } from '../../ui/button'
import { useForm } from 'react-hook-form'
import type { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import { postRequest, putRequest } from '@/utils/http'
import { brandSchema } from '@/utils/zod'
import type { APIResponseBrand, Brand } from '@/interface/brand.interface'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useDispatch } from 'react-redux'
import { closeModal } from '@/store/Modal'


interface Props {
  brand?: Brand

}
interface DataBrand {
  id: number;
  data: z.infer<typeof brandSchema>
}
export const BrandForm = ({ brand }: Props) => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const form = useForm<z.infer<typeof brandSchema>>({
    resolver: zodResolver(brandSchema),
    defaultValues: {
      name: brand?.name || "",

    },
  });

  const mutationUpdate = useMutation({
    mutationFn: (data: DataBrand) => putRequest<APIResponseBrand>(`/brands/${data.id}`, data.data, true),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['brands'] }),
  });

  const mutationCreate = useMutation({
    mutationFn: (data: z.infer<typeof brandSchema>) => postRequest<APIResponseBrand>(`/brands`, data, true),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['brands'] }),
  });

  const onSubmit = async (values: z.infer<typeof brandSchema>) => {
    const brandData = { ...values };
    if (brand) {
      mutationUpdate.mutate({
        id: brand.id,
        data: brandData
      })

    } else {
      mutationCreate.mutate({
        ...brandData
      })
    }
    dispatch(closeModal("modalBrand"))
    console.log(brand)
  }


  return (
    <Form {...form} >
      <form onSubmit={form.handleSubmit(onSubmit)} className=" relative flex flex-col ">
        <Grid container cols={{ xs: 2 }} spacing={{ xs: 1, sm: 1 }}>
          <Grid item span={{ xs: 2 }}>
            <FormFieldCustom
              control={form.control}
              name="name"
              label="Nombre"
            >
              <InputText placeholder="Categoria .." />
            </FormFieldCustom>
          </Grid>

          <Grid item span={{ xs: 2 }}>
            <Button type="submit" className="mt-10 rounded text-sm">
              {brand ? "Actualizar" : "Crear"}
            </Button>
          </Grid>
        </Grid>
      </form>
    </Form >
  )
}

