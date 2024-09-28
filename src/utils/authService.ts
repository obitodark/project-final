import type { ResponseJwt, Token } from '@/interface';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';


export const setToken = (token: Token) => {
  Cookies.set("authTokens", JSON.stringify(token), { expires: 1, secure: true, sameSite: "strict" });
};


export const getToken = (): string | undefined => {
  const authTokens = Cookies.get('authTokens');
  if (authTokens) {
    try {
      const parsed = JSON.parse(authTokens);
      return parsed.token;
    } catch (error) {

      return undefined;
    }
  }
  return undefined;
};

export const removeToken = () => {
  Cookies.remove("authTokens");
};



export const setRefreshToken = (refreshToken: string) => {
  Cookies.set('refreshToken', refreshToken, { expires: 7, secure: true, sameSite: 'Strict' });
};


export const getRefreshToken = (): string | undefined => {
  return Cookies.get('refreshToken');
};


export const removeRefreshToken = () => {
  Cookies.remove('refreshToken');
};

export const validateAuthUser = (authTokens: string): number | null => {
  let decoded: ResponseJwt | null = null;
  if (authTokens) {
    decoded = jwtDecode<ResponseJwt>(authTokens);
    const currentTime = Math.floor(Date.now() / 1000);
    if (decoded.exp && decoded.exp < currentTime) {
      return null;
    }
    return decoded.userId;
  }
  return null;
}
