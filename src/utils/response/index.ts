import { Response } from 'express'

export const CustomResponse = (
  res: Response,
  data?: any,
  status = 200
): Response<any> => {
  const result = {
    success: true,
    data: {},
  }

  if (status > 399) {
    result.success = false
  }

  if (typeof data === 'object') {
    result.data = Object.assign({}, data)
  }

  return res.status(status).json(result)
}
