import { Entity, Column, Index, OneToMany } from 'typeorm'

import { RootEntity } from '.'
import { Plan } from './plan.entity'

@Entity({ name: 'payment_types' })
export class PaymentType extends RootEntity {
  @Column({ nullable: false })
  title!: string

  @Column()
  description!: string

  /** Relations */
  @OneToMany((type) => Plan, (plan) => plan.payment_type)
  plans!: Plan[]
}
