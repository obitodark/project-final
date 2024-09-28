export interface APIResponseAuth {
  status:  number;
  message: string;
  path:    string;
  result:  Token;
}

export interface Token {
  token:        string;
  refreshToken: string;
}
