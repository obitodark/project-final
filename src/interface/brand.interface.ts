export interface APIResponseBrand {
  status:  number;
  message: string;
  path:    string;
  result:  Brand[];
}

export interface Brand {
  dateCreate: Date;
  userCreate: string;
  dateUpdate: Date;
  userUpdate: string;
  dateDelete: Date;
  userDelete: null;
  id:         number;
  name:       string;
  status:     boolean;
}
