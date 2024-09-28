export interface ResponseJwt {
  exp: number;
  iat: number;
  userId: number;
  sub: string;
  role:"ADMIN"|"USER"
}
