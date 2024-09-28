import type { Products } from "./productsBySearch.interface";
import type { Category } from "./categories.interface";
import type { Subcategory } from "./subcategories.interface";
import type { Brand } from "./brand.interface";


interface BaseModalState<T> {
  state: boolean;
  value: "CREATE" | "UPDATE";
  data?: T;
}


export type ModalProduct = BaseModalState<Products>;
export type ModalCategory = BaseModalState<Category>;
export type ModalSubcategory = BaseModalState<Subcategory>;
export type ModalBrand = BaseModalState<Brand>;


export interface Modal {
  modals: {
    modalProduct: ModalProduct;
    modalCategory: ModalCategory;
    modalSubcategory: ModalSubcategory;
    modalBrand: ModalBrand;
  };
}
