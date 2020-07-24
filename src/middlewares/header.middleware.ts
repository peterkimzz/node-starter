import { IMiddleware } from '.'
import { CustomResponse } from '../utils/response'

export const HeaderMiddleware: IMiddleware = async (req, res, next) => {
  const IS_PROD = process.env.NODE_ENV === 'production'

  res.setHeader('Access-Control-Allow-Credentials', 'true')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Content-Language,Authorization,X-Requested-With,Origin')

  /** CORS 설정 */
  const allowlist: string[] = []
  if (IS_PROD) {
    allowlist.push(process.env.PUBLIC_URL as string)
  } else {
    allowlist.push('http://localhost:3001')
    allowlist.push('http://127.0.0.1:3001')
  }
  const origin = req.headers.origin
  if (origin) {
    if (allowlist.indexOf(origin) > -1) {
      res.setHeader('Access-Control-Allow-Origin', origin)
    }
  }

  /** Preflight 설정 */
  const { method } = req
  if (method === 'OPTIONS') {
    const corsMethod = req.headers['access-control-request-method']

    res.setHeader('Access-Control-Max-Age', '3600')
    res.setHeader('Access-Control-Allow-Methods', `${method},${corsMethod}`)
    return CustomResponse(res, {}, 204)
  }

  res.setHeader('Access-Control-Allow-Methods', method)

  return next()
}
