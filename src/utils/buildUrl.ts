interface Filters {
  name?: string;
  category?: string;
  subcategories?: string[];
  brands?: string[];
  priceOrder?: 'asc' | 'desc';
  minPrice?: number;
  maxPrice?: number;
  size?: number;
  page?: number;
  status?: boolean;
}

export const buildProductSearchUrl = (filters: Filters = {}): string => {
  const params = new URLSearchParams();

  // Agrega filtros a los parámetros solo si están definidos
  if (filters.name) params.set('name', filters.name);
  if (filters.category) params.set('category', filters.category);

  if (filters.subcategories && filters.subcategories.length > 0) {
    params.set('subcategories', filters.subcategories.join(','));
  }

  if (filters.brands && filters.brands.length > 0) {
    params.set('brands', filters.brands.join(','));
  }

  if (filters.priceOrder) params.set('priceOrder', filters.priceOrder);
  if (filters.minPrice !== undefined) params.set('minPrice', filters.minPrice.toString());
  if (filters.maxPrice !== undefined) params.set('maxPrice', filters.maxPrice.toString());
  if (filters.size !== undefined) params.set('size', filters.size.toString());
  if (filters.page !== undefined) params.set('page', filters.page.toString());
  if (filters.status !== undefined) params.set('status', filters.status.toString());

  return `/products/search/${params.toString()}`;
};
