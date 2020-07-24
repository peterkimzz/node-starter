import { Entity, Column, Index, OneToMany, ManyToOne, JoinColumn } from 'typeorm'

import { RootEntity } from '.'
import { Plan } from './plan.entity'

@Entity({ name: 'plan_privileges' })
export class PlanPrivilege extends RootEntity {
  @ManyToOne((type) => Plan, (plan) => plan.privileges, { nullable: false })
  @JoinColumn({ name: 'plan_id' })
  plan!: Plan
  @Column({ nullable: false })
  plan_id!: number

  @Column()
  title!: string

  @Column()
  description!: string

  ToClient() {
    const values = super.ToClient()

    delete values.plan_id

    return values
  }
}
