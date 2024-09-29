"use client"
import { TabsCustom } from "@/components/custom";
import { AddressForm } from "@/components/features/form/AddressForm";
import { UserForm } from "@/components/features/form/UserForm";
import type { APIResponseUser, ResponseJwt, User } from "@/interface";
import { getToken } from "@/utils/authService";
import { getRequest } from "@/utils/http";
import { useQuery } from "@tanstack/react-query";
import { jwtDecode } from "jwt-decode";


type Items = {
  name: String;
  component: React.ReactElement;
  description?: string;
  title?: string;
}

export default function NamePage() {

  const { data: user = undefined } = useQuery<User>({
    queryKey: ['user'],
    queryFn: async () => {
      const token = getToken()
      let decoded: ResponseJwt | null = null;
      if (token) {
        decoded = jwtDecode<ResponseJwt>(token);
      }
      return (await getRequest<APIResponseUser>(`/users/email/${decoded?.sub}`, true)).data?.result || undefined;
    },
  });

  const tabs: Items[] = [
    {
      name: "Usuario",
      component: <UserForm dataUser={user} />,
      title: "Datos Personales",
      description: "complete los campos para actualizar"
    },
    {
      name: "Direccion",
      component: <AddressForm dataUser={user} />,
      title: "Direcion de Envio",
      description: "comfirme su direccion"
    }
  ]
  return (
    <div className="flex  justify-center items-center mb-40  sm:px-5  w-auto lg:w-[1000px]">
      {user && <div className="w-full self-center">
        <TabsCustom items={tabs} />
      </div>}
    </div>
  );
}
