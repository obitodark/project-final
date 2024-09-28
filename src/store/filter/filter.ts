import { createSlice, PayloadAction } from '@reduxjs/toolkit';

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

}

const initialState: Filters = {
  name: '',
  category: '',
  subcategories: [],
  brands: [],
  priceOrder: 'asc',

  size: 8,
  page: 0,

};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
    setCategory: (state, action: PayloadAction<string>) => {
      state.category = action.payload;
    },
    toggleSubcategory: (state, action: PayloadAction<string>) => {
      const subcategory = action.payload;
      if (state.subcategories != undefined) {
        if (state.subcategories.includes(subcategory)) {
          state.subcategories = state.subcategories.filter(sub => sub !== subcategory);
        } else {
          state.subcategories.push(subcategory);
        }
      }
    },
    toggleBrand: (state, action: PayloadAction<string>) => {
      const brand = action.payload;
      if (state.brands != undefined) {
        if (state.brands.includes(brand)) {
          state.brands = state.brands.filter(br => br !== brand);
        } else {
          state.brands.push(brand);
        }
      }
    },
    setPriceOrder: (state, action: PayloadAction<'asc' | 'desc'>) => {
      state.priceOrder = action.payload;
    },
    setMinPrice: (state, action: PayloadAction<number>) => {
      state.minPrice = action.payload;
    },
    setMaxPrice: (state, action: PayloadAction<number>) => {
      state.maxPrice = action.payload;
    },
    setSize: (state, action: PayloadAction<number>) => {
      state.size = action.payload;
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },

    resetFilters: () => initialState,
  },
});

export const {
  setName,
  setCategory,
  toggleSubcategory,
  toggleBrand,
  setPriceOrder,
  setMinPrice,
  setMaxPrice,
  setSize,
  setPage,
  resetFilters,
} = filterSlice.actions;

export default filterSlice.reducer;
