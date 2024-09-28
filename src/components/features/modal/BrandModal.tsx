"use client"
import { DialogCustom } from '../../custom/DialogCustom'

import { useDispatch, useSelector } from 'react-redux';
import { closeModal } from '@/store/Modal';
import type { ModalBrand } from '@/interface';
import { BrandForm } from '../form';

export const BrandModal = () => {

  const dispatch = useDispatch();
  const modal: ModalBrand = useSelector((state: any) => state.modal.modals.modalBrand);

  return (
    <DialogCustom
      state={modal.state}
      onClose={() => dispatch(closeModal("modalBrand"))}
      title={`${modal.data ? "Edicion de Marca" : "Creacion de Marca"}`}
      description={`datos de la Marca`}
      className="w-screen h-screen sm:max-w-[825px] sm:h-auto border-2 overflow-auto"
    >

      <BrandForm brand={modal.data} />

    </DialogCustom>
  )
}

