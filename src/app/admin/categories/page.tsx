
import { Title } from '@/components/custom/Title';
import { TableCategory } from '@/components/features/dataTable';
import { CategoriesModal } from '@/components/features/modal';




export default function CategoriesPage() {


  return (
    <div className='flex flex-col'>
      <CategoriesModal />
      <Title title='Tablero Categorias' />
      <TableCategory />
    </div>

  );
}
