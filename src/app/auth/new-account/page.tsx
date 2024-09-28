

import { Title } from "@/components/custom/Title";
import { UserForm } from "@/components/features/form/UserForm";

import Link from "next/link";



export default function NewAccountPage() {
  return (
    <div className="flex w-dvw h-dvh justify-center items-center">


      <div className=" p-10  border
        rounded-lg flex flex-col gap-8 w-[700px]">
        <Title title="Registro" subtitle="Completa los para registrarte" />
        <UserForm />

        <Link href="/auth/login" className="underline hover:text-blue-600">Iniciar Sesion</Link>
      </div>

    </div>


  )
}

