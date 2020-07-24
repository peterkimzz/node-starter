import { define } from 'typeorm-seeding'

import Faker from 'faker'
import { Plan } from '../entities/plan.entity'
import { OrderedUUID } from '../../utils/uuid'

define(Plan, (faker: typeof Faker) => {
  const gender = faker.random.number(1)
  const firstName = faker.name.firstName(gender)
  const lastName = faker.name.lastName(gender)

  const plan = new Plan()
  plan.uuid = OrderedUUID.Generate()
  plan.title = `${firstName} ${lastName}`

  plan.network_id = faker.random.number({ min: 1, max: 3 })
  plan.telecom_id = faker.random.number({ min: 1, max: 10 })
  plan.frequency_id = faker.random.number({ min: 1, max: 4 })
  plan.payment_type_id = faker.random.number({ min: 1, max: 3 })

  return plan
})
