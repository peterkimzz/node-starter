import { Entity, Column, Index, OneToMany } from 'typeorm'

import { RootEntity } from '.'
import { Plan } from './plan.entity'

@Entity({ name: 'frequencies' })
export class Frequency extends RootEntity {
  @Column({ nullable: false })
  title!: string

  /** Relations */
  @OneToMany((type) => Plan, (plan) => plan.frequency)
  plans!: Plan[]
}
