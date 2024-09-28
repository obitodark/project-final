"use client"
import { addressSchema } from "@/utils/zod"
import { InputText } from "../../custom/InputText"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form";
import type { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import type { Address, APIResponseUser, User } from "@/interface"
import { useForm } from "react-hook-form"
import { FormFieldCustom, Grid } from "@/components/custom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { putRequest } from "@/utils/http";
import { useRouter } from "next/navigation"


interface Props {
  dataUser?: User;
}
interface DataAddress {
  id: number;
  data: Address;
}
export const AddressForm = ({ dataUser }: Props) => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const form = useForm<z.infer<typeof addressSchema>>({
    resolver: zodResolver(addressSchema),
    defaultValues: {
      department: dataUser?.address?.department || "",
      province: dataUser?.address?.province || "",
      district: dataUser?.address?.district || "",
      address: dataUser?.address?.address || ""

    },
  });
  const mutationUpdate = useMutation({
    mutationFn: async (data: DataAddress) => {
      const response = await putRequest<APIResponseUser>(`/users/${data.id}`, { address: { ...data.data } }, true)
      if (response.state === 200) {
        router.push("/auth/new-account/confirm-code?origin=address")
      }
      return response
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['user'] }),
  });
  const onSubmit = async (values: z.infer<typeof addressSchema>) => {
    if (dataUser) {
      if (dataUser?.address) {
        mutationUpdate.mutate({
          id: dataUser.id,
          data: { ...values, id: dataUser?.address?.id }
        })
        console.log("se actualizo")

      } else {
        mutationUpdate.mutate({
          id: dataUser.id,
          data: { ...values }

        })
        console.log("se creo")
      }
    }

  }

  return (
    <Form {...form} >
      <form onSubmit={form.handleSubmit(onSubmit)} className=" relative flex flex-col ">
        <Grid container cols={{ xs: 2 }} spacing={{ xs: 1, sm: 3 }}>
          <Grid item span={{ xs: 2, sm: 1 }}>
            <FormFieldCustom
              control={form.control}
              name="department"
              label="Departamento"
            >
              <InputText placeholder="John" />
            </FormFieldCustom>
          </Grid>
          <Grid item span={{ xs: 2, sm: 1 }}>
            <FormFieldCustom
              control={form.control}
              name="province"
              label="Provincia"
            >
              <InputText placeholder="Departamento .." />
            </FormFieldCustom>
          </Grid>
          <Grid item span={{ xs: 2, sm: 1 }}>
            <FormFieldCustom
              control={form.control}
              name="district"
              label="Destrito"
            >
              <InputText placeholder="Departamento .." />
            </FormFieldCustom>
          </Grid>
          <Grid item span={{ xs: 2, sm: 1 }}>
            <FormFieldCustom
              control={form.control}
              name="address"
              label="Dirección"
            >
              <InputText placeholder="Departamento .." />
            </FormFieldCustom>
          </Grid>
          <Grid item span={{ xs: 2 }}>
            <Button type="submit" className="mt-10 rounded text-sm">
              {dataUser?.address ? "Actualizar" : "Crear"}
            </Button>
          </Grid>
        </Grid>
      </form>
    </Form >
  )
}

