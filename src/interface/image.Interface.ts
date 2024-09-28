export interface APIResponseImage {
  status: number;
  message: string;
  path: string;
  result: Image[];
}

export interface Image {
  dateCreate: string;
  userCreate: string;
  dateUpdate: string;
  userUpdate: string;
  dateDelete: string;
  userDelete: string;
  id: number;
  name: string;
  url: string;
  status: boolean;
}
