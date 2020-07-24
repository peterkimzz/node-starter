import { RootRepository } from '.'
import { EntityRepository } from 'typeorm'
import { Frequency } from '../database/entities/frequency.entity'

@EntityRepository(Frequency)
export class FrequencyRepository extends RootRepository<Frequency> {
  FindByTitle(title: string) {
    return this.repository.findOne({ title })
  }
}
