export interface APIResponseCategory {
  status:  number;
  message: string;
  path:    string;
  result: Category[];
}

export interface Category {
  dateCreate?:  string;
  userCreate?:  string;
  dateUpdate?:  string;
  userUpdate?:   string;
  dateDelete?:  string;
  userDelete?:  string;
  id:          number;
  name:        string;
  description: string;
  status:      boolean;
}
