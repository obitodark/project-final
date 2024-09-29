"use client"
import { DialogCustom } from '../../custom/DialogCustom'
import { useDispatch, useSelector } from 'react-redux';
import { closeModal } from '@/store/Modal';
import type {  APIResponseCategory, Category, ModalSubcategory,  } from '@/interface';
import { SubcategoriesForm } from '../form';
import { getRequest } from '@/utils/http';
import { useQuery } from '@tanstack/react-query';

export const SubcategoriesModal = () => {

  const dispatch = useDispatch();
  const modal: ModalSubcategory = useSelector((state: any) => state.modal.modals.modalSubcategory);


  const { data: categories = [] } = useQuery<Category[]>({
    queryKey: ['categories'],
    queryFn: async () => {
      return (await getRequest<APIResponseCategory>("/categories")).data?.result || [];
    },

  });
  return (
    <DialogCustom
      state={modal.state}
      onClose={() => dispatch(closeModal("modalSubcategory"))}
      title={`${modal.data ? "Edicion de Subcategoria" : "Creacion de Subcategoria"}`}
      description={`datos de Subcategoria`}
      className="w-screen h-screen sm:max-w-[825px] sm:h-auto border-2 overflow-auto"
    >

      <SubcategoriesForm categories={categories} subcategories={modal.data}/>
  
    </DialogCustom>
  )
}

