import { UuidRepository } from '.'
import { EntityRepository } from 'typeorm'
import { Plan } from '../database/entities/plan.entity'

@EntityRepository(Plan)
export class PlanRepository extends UuidRepository<Plan> {}
