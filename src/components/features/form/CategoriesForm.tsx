"use client"
import { Form } from '../../ui/form'
import { FormFieldCustom, Grid } from '../../custom'
import { InputText } from '../../custom/InputText'
import { Button } from '../../ui/button'
import { useForm } from 'react-hook-form'
import type { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import type { APIResponseCategory, Category, } from '@/interface'
import { postRequest, putRequest } from '@/utils/http'
import { categoriesSchema } from '@/utils/zod/CategoriesSchema'
import { useDispatch } from 'react-redux'
import { closeModal } from '@/store/Modal'
import { useMutation, useQueryClient } from '@tanstack/react-query'


interface Props {
  categories?: Category;

}
interface DataCategory {
  id: number;
  category: z.infer<typeof categoriesSchema>
}
export const CategoriesForm = ({ categories }: Props) => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const form = useForm<z.infer<typeof categoriesSchema>>({
    resolver: zodResolver(categoriesSchema),
    defaultValues: {
      name: categories?.name || "",
      description: categories?.description || "",
    },
  });

  const mutationCreate = useMutation({
    mutationFn: async (data: z.infer<typeof categoriesSchema>) => {
      await postRequest<APIResponseCategory>(`/categories`, data, true);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
    },
  });

  const mutationUpdate = useMutation({
    mutationFn: async (data: DataCategory) => {
      await putRequest<APIResponseCategory>(`/categories/${data.id}`, data.category, true);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
    },
  });

  const onSubmit = async (values: z.infer<typeof categoriesSchema>) => {
    const categoryData = { ...values };
    if (categories) {
      mutationUpdate.mutate({
        id: categories.id,
        category: categoryData
      })
    } else {
      mutationCreate.mutate({ ...categoryData })
    }
    dispatch(closeModal("modalCategory"))
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
          <Grid item span={{ xs: 2, }}>
            <FormFieldCustom
              control={form.control}
              name="description"
              label="Descrition"
            >
              <InputText placeholder="descripcion..." />
            </FormFieldCustom>
          </Grid>
          <Grid item span={{ xs: 2 }}>
            <Button type="submit" className="mt-10 rounded text-sm">
              {categories ? "Actualizar" : "Crear"}
            </Button>
          </Grid>
        </Grid>
      </form>
    </Form >
  )
}

