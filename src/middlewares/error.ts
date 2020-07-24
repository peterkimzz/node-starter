import { Request, Response, NextFunction } from 'express'
import { CustomResponse } from '../utils/response'
import { CustomError, TCustomError } from '../utils/error'

const IS_PROD = process.env.NODE_ENV === 'production'

export const NotFoundErrorMiddleware = (req: Request, res: Response, next: NextFunction) => {
  return next(CustomError(404))
}

export const ErrorMiddleware = (err: TCustomError, req: Request, res: Response, next: NextFunction) => {
  const status = err.status || 500
  const message = err.message || 'Internel server error'

  if (!IS_PROD) {
    console.log(err.stack)
  }

  return CustomResponse(res, { status, message }, err.status)
}
