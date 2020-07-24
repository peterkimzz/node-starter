import { Connection, getCustomRepository } from 'typeorm'

import { Seeder, Factory } from 'typeorm-seeding'
import { PaymentTypeRepository } from '../../repositories/payment_type.repository'
import { PaymentType } from '../entities/payment_type.entity'

export default class CreatePlan implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    const paymentTypeRepo = getCustomRepository(PaymentTypeRepository)

    const payment_types = await paymentTypeRepo.All()
    if (payment_types.count > 0) {
      return Promise.resolve()
    }

    await connection
      .createQueryBuilder()
      .insert()
      .into(PaymentType)
      .values([
        {
          title: '선불',
          description: ''
        },
        {
          title: '후불',
          description: ''
        },
        {
          title: '후불/e심',
          description: ''
        }
      ])
      .execute()
  }
}
