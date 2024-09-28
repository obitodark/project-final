

import { CountdownTimer } from "@/components/custom";
import { Box } from "@/components/custom/Box";
import { Title } from "@/components/custom/Title";
import { ComfirmationCodeForm } from "@/components/features/form";
import { UserForm } from "@/components/features/form/UserForm";
import { Button } from "@/components/ui/button";

import Link from "next/link";



export default function ComfirmCodePage() {
  return (
    <div className="flex w-dvw h-dvh justify-center items-start sm:items-center">
      <Box className="w-full sm:w-[600px] h-[400px] py-5 px-5 border border-stone-300 rounded-md flex flex-col justify-center gap-3">

        <Title title="Comfirmacion de Codigo" subtitle="coloque su codigo recibido en su email" className="flex justify-center w-full" />

        <ComfirmationCodeForm />
        <CountdownTimer timeSeconds={60} />

      </Box>

    </div>


  )
}

