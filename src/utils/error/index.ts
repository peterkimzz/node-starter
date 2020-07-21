import CreateError, { HttpError, UnknownError } from 'http-errors'

export type TCustomError = HttpError

export const CustomError = (...args: UnknownError[]): HttpError => {
  return CreateError(...args)
}
