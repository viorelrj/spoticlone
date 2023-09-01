import { CookieSerializeOptions } from "cookie";

const env = process.env.NODE_ENV;

export const DEFAULT_COOKIE_PARAMS = {
  httpOnly: true,
  sameSite: 'lax',
  secure: !(env === 'development')
} as CookieSerializeOptions;

export const cookieRefreshToken = 'sel_rt';
export const cookieTokenState = 'sel_state';
