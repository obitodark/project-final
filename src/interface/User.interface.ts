export interface APIResponseUsers {
  status: number;
  message: string;
  path: string;
  result: User[];
}

export interface APIResponseUser extends Omit<APIResponseUsers, 'result'> {
  result: User
}
export interface User {
  dateCreate?: string;
  userCreate?: string;
  dateUpdate?: string;
  userUpdate?: string;
  dateDelete?: string;
  userDelete?: string;
  id: number;
  name: string;
  lastName: string;
  gender: "MALE" | "FEMALE" | "OTHER";
  age: number;
  email: string;
  address: Address;
  typeDoc: string;
  numDoc: string;
  status: boolean;
  rol: Rol;
  phone?: string;
  enabled: boolean;
  authorities: Authority[];
  idUser: number;
  accountNonLocked: boolean;
  accountNonExpired: boolean;
  credentialsNonExpired: boolean;
  username: string;
}

export interface Authority {
  authority: string;
}

export interface Rol {
  id: number;
  name: string;
  code: string;
}
export interface Address {
  id?: number;
  department: string;
  province: string;
  district: string;
  address: string;
}
