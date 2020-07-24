import { UuidRepository } from '.'
import { EntityRepository } from 'typeorm'
import { Telecom } from '../database/entities/telecom.entity'

@EntityRepository(Telecom)
export class TelecomRepository extends UuidRepository<Telecom> {
  FindByTitle(title: string) {
    return this.repository.findOne({ title })
  }
}
