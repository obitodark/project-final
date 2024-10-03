"use client";

import { Button } from "@/components/ui/button";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { SelectItem } from '../../ui/select'
import { InputText } from "@/components/custom/InputText";
import { SelectCustom } from "@/components/custom/SelectCustom";
import { FormFieldCustom } from "@/components/custom/FormFieldCustom";;
import { Grid } from "../../custom";
import { signupFormSchema } from "@/utils/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { putRequest } from "@/utils/http";
import { useRouter } from "next/navigation"
import type { User } from "@/interface";
import { userFormSchema } from "@/utils/zod/UserSchema";


interface Props {
  dataUser?: User;

}
export const UserForm = ({ dataUser }: Props) => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const form = useForm<z.infer<typeof userFormSchema>>({
    resolver: zodResolver(userFormSchema),
    defaultValues: {
      name: dataUser && dataUser.name,
      lastName: dataUser?.lastName || "",
      typeDoc: dataUser?.typeDoc || "DNI",
      numDoc: dataUser?.numDoc || "",
      gender: dataUser?.gender || "",
      email: dataUser?.email || "",
      age: dataUser?.age || 0,

    },
  });

  const mutation = useMutation<any, Error, any>({
    mutationFn: async (userData) => {
      const response = await putRequest<any>(`/users/${dataUser?.id}`, userData, true);
      if (response.state === 200) {
        router.push("/auth/new-account/confirm-code?origin=address")
      }
      return response
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['user'] })
    ,
  });


  const onSubmit = async (values: z.infer<typeof userFormSchema>) => {
    console.log(values)
    mutation.mutate(values)
  };


  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className=" relative flex flex-col ">
        <Grid container cols={{ xs: 1, sm: 2 }} spacing={{ xs: 4, sm: 4 }}>
          <FormFieldCustom
            control={form.control}
            name="name"
            label="Nombres"
          >
            <InputText placeholder="John" />
          </FormFieldCustom>
          <FormFieldCustom
            control={form.control}
            name="lastName"
            label="Apellidos"
          >
            <InputText placeholder="Doe" />
          </FormFieldCustom>
          <FormField
            control={form.control}
            name="gender"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Genero:</FormLabel>
                <FormControl>
                  <SelectCustom placeHolder='genero ...' onValueChange={field.onChange}
                    defaultValue={dataUser?.gender?.toString() || ""}
                  >
                    {["MALE", "FEMALE", "OTHER"].map(gender => (
                      <SelectItem key={gender} value={gender}>{gender}</SelectItem>
                    ))}
                  </SelectCustom>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormFieldCustom
            control={form.control}
            name="age"
            label="edad"
          >
            <InputText type="number" step="1" placeholder="20...." />
          </FormFieldCustom>
          <FormFieldCustom
            control={form.control}
            name="numDoc"
            label="Número de Documento (DNI)"
          >
            <InputText placeholder="12345678" />
          </FormFieldCustom>
          <FormFieldCustom
            control={form.control}
            name="email"
            label="Email"
            rules={{ required: "Email es requerido" }}
          >
            <InputText type="email" placeholder="example@mail.com" />
          </FormFieldCustom>
          <Grid item span={{ xs: 1, sm: 2 }} />
          <Button type="submit" className="mt-10 rounded text-sm">
            Actualizar
          </Button>
        </Grid>
      </form>
    </Form>
  );
};
