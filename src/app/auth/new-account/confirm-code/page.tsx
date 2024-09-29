

import { CountdownTimer } from "@/components/custom";
import { Box } from "@/components/custom/Box";
import { Title } from "@/components/custom/Title";
import { ComfirmationCodeForm } from "@/components/features/form";
import { Suspense } from "react";



export default function ComfirmCodePage() {
  return (
    <div className="flex w-dvw h-dvh justify-center items-start sm:items-center">
      <Box className="w-full sm:w-[600px] h-[400px] py-5 px-5 border border-stone-300 rounded-md flex flex-col justify-center gap-3">

        <Title title="Comfirmacion de Codigo" subtitle="coloque su codigo recibido en su email" className="flex flex-col justify-center w-full" />

        <Suspense fallback={<div>Cargando...</div>}>
          <ComfirmationCodeForm />
        </Suspense>
        <CountdownTimer timeSeconds={300} />

      </Box>

    </div>


  )
}

