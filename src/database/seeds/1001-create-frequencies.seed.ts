import { Connection, getCustomRepository } from 'typeorm'

import { Seeder, Factory } from 'typeorm-seeding'
import { Frequency } from '../entities/frequency.entity'
import { FrequencyRepository } from '../../repositories/frequency.repository'

export default class CreatePlan implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    const frequencyRepo = getCustomRepository(FrequencyRepository)

    const frequencies = await frequencyRepo.All()
    if (frequencies.count > 0) {
      return Promise.resolve()
    }

    await connection
      .createQueryBuilder()
      .insert()
      .into(Frequency)
      .values([
        {
          title: '3G'
        },
        {
          title: '3G/LTE'
        },
        {
          title: 'LTE'
        },
        {
          title: '5G'
        }
      ])
      .execute()
  }
}
