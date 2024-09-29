"use client"
import React, { useEffect, useState } from 'react'
import { DialogCustom } from '../../custom/DialogCustom'

import { ProductForm } from '../form';
import { useDispatch, useSelector } from 'react-redux';
import { closeModal } from '@/store/Modal';
import type { APIResponseCategory, APIResponseBrand, APIResponseSubcategories, Category, ModalProduct, Subcategory } from '@/interface';
import type { Brand } from '@/interface/brand.interface';
import { getRequest } from '@/utils/http';
import { useQuery } from '@tanstack/react-query';

export const ProductModal = () => {

  const dispatch = useDispatch();
  const modal: ModalProduct = useSelector((state: any) => state.modal.modals.modalProduct);


  const { data: categories = [] } = useQuery<Category[]>({
    queryKey: ['categories'],
    queryFn: async () => {
      return (await getRequest<APIResponseCategory>("/categories")).data?.result || [];
    },
  });

  const { data: brands = [] } = useQuery<Brand[]>({
    queryKey: ['brands'],
    queryFn: async () => {
      return (await getRequest<APIResponseBrand>("/brands")).data?.result || [];
    },

  });

  const { data: subcategories = [] } = useQuery<Subcategory[]>({
    queryKey: ['subcategories'],
    queryFn: async () => {
      return (await getRequest<APIResponseSubcategories>("/subcategories")).data?.result || [];
    },
  });


  return (
    <DialogCustom
      state={modal.state}
      onClose={() => dispatch(closeModal("modalProduct"))}
      title={`${modal.data ? "Edicion de producto" : "Creacion de Product"}`}
      description={`datos del producto`}
      className="w-screen h-screen sm:max-w-[825px] sm:h-auto border-2 overflow-auto"
    >

      <ProductForm
        products={modal.data}
        categories={categories}
        brands={brands}
        subcategories={subcategories}
      />

    </DialogCustom>
  )
}

