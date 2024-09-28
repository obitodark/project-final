"use client"


// import { DrawerCart } from "@/components/slideDrawer/DrawerCart";
// import { BoxFilterSearch } from "@/components/boxFilter/BoxFilterSearch";
import { useAppSelector } from "@/store";
import { ListFilter } from "../features/filter/ListFilter";
import { Title } from "../custom/Title";
import { Grid } from "../custom";
import { Button } from "../ui/button";
import { SearchFilter } from "../features/filter/SearchFilter";


interface Props {
  children: React.ReactNode;
  title?: string
}

export const BoxShowcase = ({ children, title = "List de productos" }: Props) => {
  const filters = useAppSelector((state) => state.filter);
  return (
    <>
      <Title title={`Articulos ${filters.category && "de " + filters.category}`} subtitle="Todos los productos" className="mb-2 ml-3 md:ml-3" />

      <Grid container className=" p-0 sm:p-4 " >
        <Grid item span={{ xs: 3 }} className=" h-dvh hidden lg:block border-r pt-10" >
          <ListFilter />
        </Grid>
        <Grid
          item span={{ xs: 12, lg: 9 }}>
          <div className="flex flex-col justify-center">
            <SearchFilter />
            {children}
          </div>
        </Grid>
      </Grid>

    </>
  )
}
