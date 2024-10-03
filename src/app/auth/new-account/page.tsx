
import { Box } from "@/components/custom/Box";
import { Title } from "@/components/custom/Title";
import { SignUpForm } from "@/components/features/form";
import Link from "next/link";



export default function NewAccountPage() {
  return (
    <Box className="flex w-dvw h-dvh justify-center items-center">
      <Box className=" p-10  border
        rounded-lg flex flex-col gap-8 w-[700px]">
        <Title title="Registro" subtitle="Completa los para registrarte" />
        <SignUpForm />
        <Link href="/auth/login" className="underline hover:text-blue-600">Iniciar Sesion</Link>
      </Box>
    </Box>


  )
}

