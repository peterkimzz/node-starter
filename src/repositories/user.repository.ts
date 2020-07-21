import { UuidRepository } from '.'
import { EntityRepository } from 'typeorm'
import { User } from '../database/entity/User'

@EntityRepository(User)
export class UserRepository extends UuidRepository<User> {
  FindByEmail(email: string) {
    return this.repository.findOne({ email })
  }
}
