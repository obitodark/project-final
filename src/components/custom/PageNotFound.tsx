import Link from "next/link"
import Image from "next/image"
import { titleFont } from "@/config/fonts"
import { Box } from "./Box"

export const PageNotFound = () => {
  return (
    <Box className="flex flex-col-reverse md:flex-row h-[800px] w-full justify-center items-center align-middle">
      <Box className="text-center
  px-5 mx-5">
        <h2 className={`${titleFont.className} text-9xl`}>404</h2>
        <p className="font-semibold text-xl">Whoops ! Lo sentimos mucho.</p>
        <p className="font-light">
          <span>Pudes regresar al </span>
          <Link href={"/"} className="font-normal hover:underline transition-all">Inicio</Link>
        </p>
      </Box>
      <Box className="px-5 mx-5">
        <Image src={"/imgs/image-not-found.svg"}
          alt="starman"
          className="p-5 sm:p-0"
          width={550}
          height={550}
        />
      </Box>
    </Box >
  )
}

