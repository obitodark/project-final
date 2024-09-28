export interface APIResponseSearchProducts {
  status: number;
  message: string;
  path: string;
  result: Result;
}
export interface APIResponseProducts extends Omit<APIResponseSearchProducts, 'result'> {
  result: Products[];

}
export interface APIResponseProduct extends Omit<APIResponseSearchProducts, 'result'> {
  result: Products;

}
export interface Result {
  totalPages: number;
  currentPage: number;
  nextPage: number;
  nextPageUrl: string;
  data: Products[];
}

export interface Products {
  dateCreate?: string;
  userCreate?: string;
  dateUpdate?: string;
  dateDelete?: string;
  id?: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  slug?: string;
  status?: boolean;
  originalName?: string;
  brand: Item;
  category: Item;
  subcategory: Item;
  images: ImageProduct[];

}

export interface ProductDTO extends Omit<Products, 'brand' | 'category' | 'subcategory' | 'images'>, ProductRelations { }


export interface ProductRelations {
  brand: number;
  category: number;
  subcategory: number;
  images?: number[];
}
export interface Item {
  id: number;
  name: string;
  status: boolean | null;
  description?: string;
}

export interface ImageProduct {
  id: number;
  name: string;
  url: string;
}

export interface ProductsParams {
  name?: string;
  category?: string;
  subcategories?: string[];
  brands?: string[];
  priceOrder?: 'asc' | 'desc';
  maxPrice?: number | null;
  minPrice?: number | null;
  size?: number;
  page?: number;
  status?: boolean;
}
