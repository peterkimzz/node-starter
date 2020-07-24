import { RootRepository } from '.'
import { EntityRepository } from 'typeorm'
import { PlanContractQualification } from '../database/entities/plan_contract_qualification.entity'

@EntityRepository(PlanContractQualification)
export class PlanContractQualificationRepository extends RootRepository<PlanContractQualification> {
  FindByPlanId(plan_id: number) {
    return this.All({ where: { plan_id } })
  }
}
