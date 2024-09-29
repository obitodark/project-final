
import { Title } from '@/components/custom/Title';
import { TableBrand } from '@/components/features/dataTable/table/TableBrand';
import { BrandModal } from '@/components/features/modal';

export default function BrandPage() {
  return (
    <div className='flex flex-col'>
      <BrandModal />
      <Title title='Tablero Marcas' />
      <TableBrand />
    </div>

  );
}
