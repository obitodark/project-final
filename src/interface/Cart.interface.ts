export interface APIResponseCards {
  status: number;
  message: string;
  path: string;
  result: Cart[];
}
export interface APIResponseCard extends Omit<APIResponseCards, 'result'> {
  result: Cart;

}

export interface Cart {
  id: number;
  cartItems: CartItem[];
  user: User;
  totalPrice: number;
  fecha: Date;
  status: string;
}

export interface CartItem {
  id: number;
  priceUnitary: number;
  quantity: number;
  price: number;
  product: Product;
  status: string;
}

export interface Product {
  dateCreate: Date;
  userCreate: string;
  dateUpdate: Date;
  dateDelete: Date;
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  slug: string;
  status: boolean;
  originalName: string;
  brand: Brand;
  category: Brand;
  subcategory: Brand;
  images: Image[];
}

interface Brand {
  id: number;
  name: string;
  status: boolean | null;
  description?: string;
}

interface Image {
  id: number;
  name: string;
  url: string;
}

interface User {
  dateCreate: Date;
  dateUpdate: Date;
  dateDelete: Date;
  id: number;
  name: string;
  lastName: string;
  gender: string;
  address: Address;
  age: number;
  email: string;
  typeDoc: string;
  numDoc: string;
  status: boolean;
  rol: Rol;
  enabled: boolean;
  authorities: Authority[];
  username: string;
  accountNonLocked: boolean;
  idUser: number;
  accountNonExpired: boolean;
  credentialsNonExpired: boolean;
}

interface Authority {
  authority: string;
}

interface Rol {
  id: number;
  name: string;
  code: string;
}

 interface Address {
  id?: number;
  department: string;
  province: string;
  district: string;
  address: string;
}
