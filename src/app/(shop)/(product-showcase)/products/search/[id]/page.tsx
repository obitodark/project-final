import { Grid, PaginationBox } from "@/components/custom";
import { Box } from "@/components/custom/Box";
import { ProductGrid } from "@/components/features/product";
import { titleFont } from "@/config/fonts";
import type { APIResponseSearchProducts } from "@/interface";
import { getRequest } from "@/utils/http";

interface Props {
  params: {
    id: string
  }
}

export default async function SearchProductPage({ params }: Props) {
  const { id } = params;
  const decodedQueryString = decodeURIComponent(id);
  const data = await getRequest<APIResponseSearchProducts>(`/product/search?${decodedQueryString}`);

  return (
    <>
      <Grid cols={{ xs: 12 }} className="flex justify-end">
        {data.data?.result?.data ? <PaginationBox page={data.data?.result?.totalPages} /> : ""}
      </Grid>
      {
        data.data?.result?.data
          ? <ProductGrid products={data.data?.result?.data} />
          : <Box className="flex flex-col justify-center items-center h-[500px]">
            <h4 className={`${titleFont.className} font-semibold text-xl
              `}>Sin Resultados </h4>
          </Box>
      }
      <Grid cols={{ xs: 12 }} className="flex justify-end">
        {data.data?.result?.data ? <PaginationBox page={data.data?.result?.totalPages} /> : ""}
      </Grid>
    </>
  );
}
