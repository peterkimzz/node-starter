import { Entity, Column, Index, OneToMany } from 'typeorm'

import { UuidEntity } from '.'
import { Plan } from './plan.entity'

@Entity({ name: 'telecoms' })
export class Telecom extends UuidEntity {
  @Column({ nullable: false })
  title!: string

  @Column()
  logo_url!: string

  @Column()
  website!: string

  /** Relations */
  @OneToMany((type) => Plan, (plan) => plan.telecom)
  plans!: Plan[]
}
