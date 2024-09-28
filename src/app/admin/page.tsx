

import { Title } from '@/components/custom/Title';
import { ProductModal } from '@/components/features/modal/ProductModal';
import { TableProducts } from '@/components/features/dataTable';
import { getToken } from '@/utils/authService';




export default function ProductPage() {

  const token = getToken();
  console.log("token", token)
  return (
    <div className='flex flex-col'>
      <ProductModal />
      <Title title='Tablero Productos' />
      <TableProducts />
    </div>

  );
}
