import { Response, CookieOptions } from 'express'

export const SetCookie = (res: Response, key: string, value: string, options?: CookieOptions) => {
  const IS_PROD = process.env.NODE_ENV === 'production'
  const PUBLIC_URL = process.env.PUBLIC_URL as string

  res.cookie(key, value, {
    maxAge: 1000 * 60 * 60,
    ...options,
    signed: true,
    httpOnly: true,
    sameSite: IS_PROD ? 'strict' : 'none',
    domain: IS_PROD ? `.${PUBLIC_URL}` : 'localhost',
    secure: IS_PROD ? true : false
  })
}
