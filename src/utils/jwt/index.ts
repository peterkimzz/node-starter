import jwt, { SignOptions } from 'jsonwebtoken'
import { CustomError } from '../error'

export const SignToken = (payload: object, options?: SignOptions) => {
  return jwt.sign(payload, process.env.JWT_SECRET as string, {
    ...options,
    issuer: process.env.JWT_ISSUER,
    expiresIn: '24h',
  })
}

type ITokenResult = {
  [key: string]: string
}
export const DecodeToken = (token: string): ITokenResult => {
  const decoded = jwt.decode(token)
  if (!decoded) {
    throw CustomError(400, `invalid token.`)
  }

  if (typeof decoded === 'string') {
    throw CustomError(500, `token cannot be string type.`)
  }

  if (decoded.iss) {
    if (decoded.iss !== process.env.JWT_ISSUER) {
      throw CustomError(400, 'invalid issuer.')
    }
  }

  return decoded
}
