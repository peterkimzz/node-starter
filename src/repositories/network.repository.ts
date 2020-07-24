import { RootRepository } from '.'
import { EntityRepository } from 'typeorm'
import { Network } from '../database/entities/network.entity'

@EntityRepository(Network)
export class NetworkRepository extends RootRepository<Network> {
  FindByTitle(title: string) {
    return this.repository.findOne({ title })
  }
}
