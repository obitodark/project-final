"use client"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../../ui/form'
import { FormFieldCustom, Grid, InputImage, MessageError } from '../../custom'
import { InputText } from '../../custom/InputText'
import { SelectCustom } from '../../custom/SelectCustom'
import { Button } from '../../ui/button'
import { useForm } from 'react-hook-form'
import type { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Textarea } from '../../ui/textarea'
import { Box } from '../../custom/Box'
import { productSchema } from '@/utils/zod'
import type { APIResponseProducts, Category, Products, Subcategory } from '@/interface'
import { SelectItem } from '../../ui/select'
import type { Brand } from '@/interface/brand.interface'
import { uploadImages } from '@/utils'
import { useState } from 'react'
import { postRequest, putRequest } from '@/utils/http'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useDispatch } from 'react-redux'
import { closeModal } from '@/store/Modal'


interface Props {
  categories: Category[];
  brands: Brand[];
  subcategories: Subcategory[];
  products?: Products;
}
interface ProductData {
  name: string;
  price: number;
  stock: number;
  category: number;
  subcategory: number;
  brand: number;
  description: string;
  images: number[];
}

export const ProductForm = ({ categories, brands, subcategories, products }: Props) => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [idImagesUpdated, setIdImagesUpdated] = useState<number[]>([])
  const [uploadError, setUploadError] = useState<string | null>(null);
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const form = useForm<z.infer<typeof productSchema>>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: products?.name || "",
      price: products?.price || 0,
      stock: products?.stock || 0,
      category: products?.category?.id || 0,
      subcategory: products?.subcategory?.id || 0,
      brand: products?.brand?.id || 0,
      description: products?.description || "",
    },
  });

  const handleFileChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = [...selectedFiles];
      newFiles[index] = e.target.files[0];
      setSelectedFiles(newFiles);
      if (products && products.images[index]) {
        setIdImagesUpdated(prevIds => [...prevIds, products.images[index].id]);
      }
      const totalSize = newFiles.reduce((total, file) => total + file?.size, 0);
      if (totalSize > 10 * 1024 * 1024) {
        setUploadError("El tamaño total de las imágenes no puede exceder 10 MB.");
      } else {
        setUploadError(null);
      }
    }

  };

  const handlerCreateProduct = async (values: z.infer<typeof productSchema>) => {
    const uploadedImageIds = await uploadImages(selectedFiles);
    if (uploadedImageIds.length > 0) {
      const productData = {
        ...values,
        images: uploadedImageIds,
      };
      mutationCreate.mutate(productData)
    }
  }

  const mutationCreate = useMutation<Products[], Error, ProductData>({
    mutationFn: async (productData) => {
      const response = await postRequest<APIResponseProducts>("/product", productData, true);
      dispatch(closeModal("modalProduct"))
      return response.data?.result || [];
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });

  const mutationUpdate = useMutation<Products[], Error, ProductData>({
    mutationFn: async (productData) => {
      if (products) {
        await putRequest<APIResponseProducts>(`/product/${products.id}`, productData, true)
        dispatch(closeModal("modalProduct"))
      }
      return []
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });

  const handlerUpdateProduct = async (values: z.infer<typeof productSchema>) => {
    let uploadedImageIds: number[] = []
    const existingImageIds = products?.images?.map(image => image.id) || [];

    if (selectedFiles.length > 0) {
      uploadedImageIds = await uploadImages(selectedFiles);
    }
    const replaceMap = new Map(idImagesUpdated.map((id, index) => [id, index]));
    const finalIds = existingImageIds.map(existingId => {
      const indexToReplace = replaceMap.get(existingId);
      return indexToReplace !== undefined ? uploadedImageIds[indexToReplace] : existingId;
    });

    const numberOfReplacements = idImagesUpdated.length;
    const extraIds = uploadedImageIds.slice(numberOfReplacements);
    const idUpdated = [...finalIds, ...extraIds];

    const productData = {
      ...values,
      images: idUpdated,
    };
    if (products) {
      mutationUpdate.mutate(productData)
    }
  }

  const onSubmit = async (values: z.infer<typeof productSchema>) => {
    if (uploadError) {
      console.error(uploadError);
      return;
    }
    if (products) {
      await handlerUpdateProduct(values);
    } else {
      await handlerCreateProduct(values);

    }


  }


  return (
    <Form {...form} >
      <form onSubmit={form.handleSubmit(onSubmit)} className=" relative flex flex-col ">
        <Grid container cols={{ xs: 1, sm: 2 }} spacing={{ xs: 1, sm: 1 }}>
          <Grid item span={{ xs: 2, sm: 1 }}>
            <FormFieldCustom
              control={form.control}
              name="name"
              label="Nombre"
            >
              <InputText placeholder="Producto .." value={products && products?.name} />
            </FormFieldCustom>
          </Grid>
          <Grid item span={{ xs: 2, sm: 1 }}>
            <FormFieldCustom
              control={form.control}
              name="price"
              label="Precio"
            >
              <InputText type='number' placeholder="100.00" />
            </FormFieldCustom>
          </Grid>
          <Grid item span={{ xs: 2, sm: 1 }}>
            <FormFieldCustom
              control={form.control}
              name="stock"
              label="Stock"
            >
              <InputText type='number' placeholder="5" />
            </FormFieldCustom>
          </Grid>

          <Grid item span={{ xs: 2, sm: 1 }}>
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Categoria:</FormLabel>
                  <FormControl>
                    <SelectCustom onValueChange={field.onChange} placeHolder="categoria ..."
                      defaultValue={products?.category?.id?.toString() || ""}
                    >
                      {categories && categories.map(category => (
                        <SelectItem key={category.id} value={(category.id).toString()}>{category.name}</SelectItem>
                      ))}
                    </SelectCustom>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            /></Grid>

          <Grid item span={{ xs: 2, sm: 1 }}>
            <FormField
              control={form.control}
              name="subcategory"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Subcategoria:</FormLabel>
                  <FormControl>
                    <SelectCustom placeHolder='Subcategorias ...' onValueChange={field.onChange}
                      defaultValue={products?.subcategory?.id?.toString() || ""}
                    >
                      {subcategories.map(subcategory => (
                        <SelectItem key={subcategory.id} value={`${subcategory.id}`}>{subcategory.name}</SelectItem>
                      ))}
                    </SelectCustom>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </Grid>

          <Grid item span={{ xs: 2, sm: 1 }}>
            <FormField
              control={form.control}
              name="brand"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor='brand'>Marca:</FormLabel>
                  <FormControl>
                    <SelectCustom onValueChange={field.onChange} placeHolder='brands...'
                      defaultValue={products?.brand?.id?.toString() || ""}
                    >
                      {brands.map(brand => (
                        <SelectItem
                          key={brand.id} value={`${brand.id}`}>{brand.name}</SelectItem>
                      ))}
                    </SelectCustom>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </Grid>

          <Grid item span={{ xs: 2 }}>
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel >Descripcion</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Tell us a little bit about yourself"
                      className="resize-none"
                      {...field}
                      cols={4}
                      rows={4}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </Grid>

          <Grid item span={{ xs: 2 }} className='flex flex-col gap-2 mt-2'>
            <Box className='flex gap-2 flex-wrap justify-start'>

              {[...new Array(5)].map((_, index) => (

                <Box key={index} className='flex flex-col gap-2'>
                  <InputImage
                    key={index}
                    onChange={(e) => handleFileChange(index, e)}
                    label={`image-${index + 1}`}
                    initialImage={products && products.images ? products.images[index]?.url : null}
                  />
                  <span className='text-xs
                  '>
                    {selectedFiles && selectedFiles[index] ? `${(selectedFiles[index].size / 1024).toFixed(2)} KB` : ""}
                  </span>

                </Box>

              ))}

            </Box>
            <Box className="mt-2">
              <span className="font-bold">Peso Total: </span>
              {selectedFiles && selectedFiles.length > 0 ? (
                `${(selectedFiles
                  .filter(file => file !== undefined && file !== null)
                  .reduce((total, file) => total + (file.size || 0), 0) / (1024 * 1024)
                ).toFixed(2)} MB`
              ) : (
                ""
              )}
            </Box>
            {uploadError && <MessageError message={uploadError} />}
          </Grid>


          <Grid item span={{ xs: 2 }}>
            <Button type="submit" className="mt-10 rounded text-sm">
              {products ? "Actualizar" : "Crear"}
            </Button>
          </Grid>

        </Grid>
      </form>
    </Form >
  )
}

