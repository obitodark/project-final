import type { Category } from "./categories.interface";

export interface APIResponseSubcategories {
  status:  number;
  message: string;
  path:    string;
  result:  Subcategory[];
}

export interface Subcategory {
  dateCreate?: string;
  userCreate?: string;
  dateUpdate?: string;
  userUpdate?: string;
  dateDelete?: string;
  userDelete?: string;
  id:         number;
  name:       string;
  status:     boolean;
  category:   Categoryitem;
}

export interface Categoryitem extends Omit<Category,'dateCreate'|'dateUpdate'|'dateDelete'|'userCreate'|'userDelete'|'userUpdate'> {

}
