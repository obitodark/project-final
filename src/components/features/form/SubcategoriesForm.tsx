"use client"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../../ui/form'
import { FormFieldCustom, Grid } from '../../custom'
import { InputText } from '../../custom/InputText'
import { Button } from '../../ui/button'
import { useForm } from 'react-hook-form'
import type { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import { postRequest, putRequest } from '@/utils/http'

import type { APIResponseSubcategories, Category, Subcategory } from '@/interface'
import { subcategoriesSchema } from '@/utils/zod'
import { SelectCustom } from '@/components/custom/SelectCustom'
import { SelectItem } from '@/components/ui/select'
import { useDispatch } from 'react-redux'
import { closeModal } from '@/store/Modal'
import { useMutation, useQueryClient } from '@tanstack/react-query'


interface Props {
  subcategories?: Subcategory;
  categories: Category[];

}
interface DataSubcategory {
  id: number;
  subcategory: z.infer<typeof subcategoriesSchema>
}
export const SubcategoriesForm = ({ subcategories, categories }: Props) => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const form = useForm<z.infer<typeof subcategoriesSchema>>({
    resolver: zodResolver(subcategoriesSchema),
    defaultValues: {
      name: subcategories?.name || "",
      category: subcategories?.category.id || 0,
    },
  });

  const mutationCreate = useMutation({
    mutationFn: async (data: z.infer<typeof subcategoriesSchema>) => {
      await postRequest<APIResponseSubcategories>(`/subcategories`, data, true);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['subcategories'] });
    },
  });

  const mutationUpdate = useMutation({
    mutationFn: async (data: DataSubcategory) => {
      await putRequest<APIResponseSubcategories>(`/subcategories/${data.id}`, data.subcategory, true);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['subcategories'] });
    },
  });


  const onSubmit = async (values: z.infer<typeof subcategoriesSchema>) => {
    const subcategoryData = { ...values };
    if (subcategories) {
      mutationUpdate.mutate({
        id: subcategories.id,
        subcategory: subcategoryData
      })
    } else {
      mutationCreate.mutate({ ...subcategoryData })
    }
    dispatch(closeModal("modalSubcategory"))
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
          <Grid item span={{ xs: 2, sm: 1 }}>
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Categoria:</FormLabel>
                  <FormControl>
                    <SelectCustom onValueChange={field.onChange} placeHolder="categoria ..."
                      defaultValue={subcategories?.category?.id?.toString() || ""}
                    >
                      {categories && categories.map(category => (
                        <SelectItem key={category.id} value={(category.id).toString()}>{category.name}</SelectItem>
                      ))}
                    </SelectCustom>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            /></Grid>

          <Grid item span={{ xs: 2 }}>
            <Button type="submit" className="mt-10 rounded text-sm">
              {subcategories ? "Actualizar" : "Crear"}
            </Button>
          </Grid>



        </Grid>
      </form>
    </Form >
  )
}

