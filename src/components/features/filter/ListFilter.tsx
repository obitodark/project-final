"use client"
import React from "react";
import { Accordion } from "../../ui/accordion"
import { RadioGroup } from "../../ui/radio-group"
import { SliderPrice } from "../../custom/SliderPrice"
import { useDispatch } from "react-redux"
import { useAppSelector } from "@/store"
import { useRouter } from "next/navigation"
import { setCategory, setMaxPrice, setMinPrice, toggleBrand, toggleSubcategory } from "@/store/filter/filter"
import { useEffect } from "react"
import { buildProductSearchUrl } from "@/utils"
import { ListDropdown } from "../../custom/ListDropdown"
import { RadioButtonItem } from "../../custom/RadioButtonItem"
import { CheckboxItem } from "../../custom/CheckboxItem"
import { useQuery } from "@tanstack/react-query"
import type { APIResponseBrand, APIResponseCategory, APIResponseSubcategories, Brand, Category, Subcategory } from "@/interface"
import { getRequest } from "@/utils/http"


export const ListFilter = () => {
  const dispatch = useDispatch();
  const filters = useAppSelector((state) => state.filter);
  const router = useRouter();
  const buildUrl = () => buildProductSearchUrl(filters);
  const { category, brands, subcategories } = filters;
  const handleCheckboxChange = (item: string, type: 'subcategories' | 'brands') => {
    if (type === 'subcategories') {
      dispatch(toggleSubcategory(item));
    } else {
      dispatch(toggleBrand(item));
    }
  };


  const { data: categories = [] } = useQuery<Category[]>({
    queryKey: ['categories'],
    queryFn: async () => {
      return (await getRequest<APIResponseCategory>("/categories")).data?.result || [];
    },
  });
  const { data: brandsApi = [] } = useQuery<Brand[]>({
    queryKey: ['brands'],
    queryFn: async () => {
      return (await getRequest<APIResponseBrand>("/brands")).data?.result || [];
    },
  });

  const { data: subcategoriesApi = [] } = useQuery<Subcategory[]>({
    queryKey: ['subcategories'],
    queryFn: async () => {
      return (await getRequest<APIResponseSubcategories>("/subcategories")).data?.result || [];
    },
  });

  const handleSliderChangeMin = (newValue: number) => {
    dispatch(setMinPrice(newValue))
  };
  const handleSliderChangeMax = (newValue: number) => {
    dispatch(setMaxPrice(newValue))
  };

  const handleRadioChange = (value: string) => {
    dispatch(setCategory(value));

  };

  useEffect(() => {
  
    const url = buildUrl();
    router.push(url);
  }, [filters]);


  return (
    <>
      <aside className="w-full  overflow-auto scrollbar h-[80%]  rounded-md  ">
        <h2 className='text-xl font-semibold my-3'>Filtro</h2>
        <Accordion type="multiple" className="w-full px-5">
          <ListDropdown label="Categorias">
            <RadioGroup
              value={`${category}`} onValueChange={handleRadioChange}>
              {categories.map(item => (
                <RadioButtonItem key={item.id} value={item.name} />
              ))}
            </RadioGroup>
          </ListDropdown>
          <ListDropdown label="Subcategorias">
            {subcategoriesApi.filter(item => item.category.name === `${category}`)
              .map(subcategory => (
                <CheckboxItem
                  key={subcategory.id}
                  label={subcategory.name}
                  checked={subcategories && subcategories.includes(subcategory.name)}
                  onCheckedChange={() => handleCheckboxChange(subcategory.name, "subcategories")} />
              ))}
          </ListDropdown>
          <ListDropdown label="Marcas">
            {brandsApi.map(brand => (
              <CheckboxItem
                key={brand.id}
                label={brand.name}
                checked={brands && brands.includes(brand.name)}
                onCheckedChange={() => handleCheckboxChange(brand.name, "brands")} />
            ))}
          </ListDropdown>
          <ListDropdown label="Rango de Precio">
            <SliderPrice max={3000} min={0} label='Max:' onChange={handleSliderChangeMax} />
            <SliderPrice max={3000} min={0} label='Min:' onChange={handleSliderChangeMin} />
          </ListDropdown>
        </Accordion>
      </aside>

    </>
  )
}

