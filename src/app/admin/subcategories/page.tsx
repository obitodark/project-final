
import { Title } from '@/components/custom/Title';
import { TableSubcategory } from '@/components/features/dataTable/table/TableSubcategory';
import { SubcategoriesModal } from '@/components/features/modal';





export default function SubcategoriesPage() {


  return (
    <div className='flex flex-col'>
      <SubcategoriesModal />
      <Title title='Tablero Subcategoria' />
      <TableSubcategory />
    </div>

  );
}
