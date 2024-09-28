

import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa"
import { Grid } from "../custom"


export const Pages = ["Iniciar Sesion", "Registro", "Articulos", "Cerrar Sesion"]
export const Filtros = ["Categoria", "Subcategoria", "Marcas", "Precio"]

export const Footer = () => {
  return (
    <Grid container cols={{ xs: 12 }} spacing={{ xs: 6 }} className="bg-stone-900 text-gray-400 py-10">
      <Grid item span={{ xs: 12, lg: 3 }} className="flex justify-center items-center gap-5 py-10 lg:py-48" >
        <h2 className="text-2xl text-white">Tienda | Obis</h2>

      </Grid>
      <Grid item span={{ xs: 6, sm: 4, lg: 3 }} className="flex flex-col justify-center items-center">
        <h2 className="text-2xl text-white text-start">Enlaces</h2>
        <ul>
          {Pages.map((page, index) => (
            <li key={index}>{page}</li>
          ))}
        </ul>
      </Grid>
      <Grid item span={{ xs: 6, sm: 4, lg: 3 }} className="flex flex-col justify-center items-center">
        <h2 className="text-2xl text-white">Filtros</h2>
        <ul>
          {Filtros.map((page, index) => (
            <li key={index}>{page}</li>
          ))}
        </ul>
      </Grid>
      <Grid item span={{ xs: 12, sm: 4, lg: 3 }} className="flex flex-col justify-center items-center">
        <h2 className="text-xl text-white mb-5">Medios Sociales</h2>
        <ul className="flex gap-4">
          <li><FaFacebook size={25} /></li>
          <li><FaTwitter size={25} /></li>
          <li><FaInstagram size={25} /></li>
        </ul>
      </Grid>
      <Grid item span={{ xs: 12 }} className="text-white flex justify-center border-t-2 border-y-stone-700  pt-5 ">
        <span>© {new Date().getFullYear()} Company Co. All rights reserved.</span>
      </Grid>
    </Grid>
  )
}
