import { Connection } from 'typeorm'

import { Seeder, Factory } from 'typeorm-seeding'
import { Plan } from '../entities/plan.entity'

export default class CreatePlan implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    // await factory(Plan)().createMany(10)
  }
}
