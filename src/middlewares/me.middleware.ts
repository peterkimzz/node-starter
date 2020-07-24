import { IMiddleware } from '.'
import { CustomError } from '../utils/error'
import { getCustomRepository } from 'typeorm'
import { DecodeToken } from '../utils/jwt'

export const MeMiddleware: IMiddleware = async (req, res, next) => {
  req.user = undefined
  // const userRepository = getCustomRepository(UserRepository)

  try {
    const { access_token } = req.signedCookies

    /** 토큰 없으면 비 로그인 상태 */
    if (!access_token) {
      return next()
    }

    // /** 유저 인증 토큰 검증하기 */
    // const { uuid } = DecodeToken(access_token)
    // if (!uuid) {
    //   throw CustomError(500, `invalid access token.`)
    // }

    // /** 유저 Entity Request 객체에 주입 */
    // const user = await userRepository.FindByUuid(uuid)
    // if (!user) {
    //   throw CustomError(500, `Invalid user.`)
    // }

    // req.user = user

    return next()
  } catch (err) {
    return next(err)
  }
}
