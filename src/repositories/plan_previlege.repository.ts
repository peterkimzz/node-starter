import { RootRepository } from '.'
import { EntityRepository } from 'typeorm'
import { PlanPrivilege } from '../database/entities/plan_privilege.entity'

@EntityRepository(PlanPrivilege)
export class PlanPrivilegeRepository extends RootRepository<PlanPrivilege> {
  FindByPlanId(plan_id: number) {
    return this.All({ where: { plan_id } })
  }
}
