import { IController } from '../'

import { SetCookie } from '../../utils/cookie'
import { CustomError } from '../../utils/error'
import { CustomResponse } from '../../utils/response'
import { SignToken } from '../../utils/jwt'

export const Me: IController = async (req, res, next) => {
  try {
    const user = req.user ? req.user.ToClient() : null

    return CustomResponse(res, { user })
  } catch (err) {
    next(err)
  }
}

export const Login: IController = async (req, res, next) => {
  const {} = req.body

  try {
    /** 로그인은 90일간 유지됨 */
    const ninety_days = 1000 * 60 * 60 * 24 * 90
    const access_token = SignToken(
      { uuid: '42a0dc96f2edb81881df58dca3d5cf5d' },
      { expiresIn: ninety_days }
    )
    SetCookie(res, 'access_token', access_token, { maxAge: ninety_days })

    return CustomResponse(res, { access_token })
  } catch (err) {
    next(err)
  }
}

export const Logout: IController = async (req, res, next) => {
  try {
    SetCookie(res, 'access_token', '', { maxAge: 1 })

    return CustomResponse(res)
  } catch (err) {
    next(err)
  }
}
