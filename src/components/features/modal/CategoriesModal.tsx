"use client"
import { DialogCustom } from '../../custom/DialogCustom'
import { CategoriesForm} from '../form';
import { useDispatch, useSelector } from 'react-redux';
import { closeModal } from '@/store/Modal';
import type {  ModalCategory,  } from '@/interface';

export const CategoriesModal = () => {

  const dispatch = useDispatch();
  const modal: ModalCategory = useSelector((state: any) => state.modal.modals.modalCategory);

  return (
    <DialogCustom
      state={modal.state}
      onClose={() => dispatch(closeModal("modalCategory"))}
      title={`${modal.data ? "Edicion de categoria" : "Creacion de categoria"}`}
      description={`datos del categoria`}
      className="w-screen h-screen sm:max-w-[825px] sm:h-auto border-2 overflow-auto"
    >

      <CategoriesForm categories={modal.data}/>
  
    </DialogCustom>
  )
}

