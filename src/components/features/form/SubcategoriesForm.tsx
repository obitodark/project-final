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


interface Props {
  subcategories?: Subcategory;
  categories: Category[];

}

export const SubcategoriesForm = ({ subcategories, categories }: Props) => {
  const dispatch = useDispatch();
  const form = useForm<z.infer<typeof subcategoriesSchema>>({
    resolver: zodResolver(subcategoriesSchema),
    defaultValues: {
      name: subcategories?.name || "",
      category: subcategories?.category.id || 0,
    },
  });

  

  const onSubmit = async (values: z.infer<typeof subcategoriesSchema>) => {
    const subcategoryData = { ...values };
    if (subcategories) {
      await putRequest<APIResponseSubcategories>(`/subcategories/${subcategories.id}`, subcategoryData,true);
    } else {
      await postRequest<APIResponseSubcategories>("/subcategories", subcategoryData,true);
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

