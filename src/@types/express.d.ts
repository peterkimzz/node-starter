import { User } from '../database/entity/User'

declare global {
  namespace Express {
    interface Request {
      user?: User
    }
  }
}
