import { RootRepository } from '.'
import { EntityRepository } from 'typeorm'
import { PaymentType } from '../database/entities/payment_type.entity'

@EntityRepository(PaymentType)
export class PaymentTypeRepository extends RootRepository<PaymentType> {
  FindByTitle(title: string) {
    return this.repository.findOne({ title })
  }
}
