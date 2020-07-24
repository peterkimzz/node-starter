import { Entity, Column, Index, OneToMany } from 'typeorm'

import { RootEntity } from '.'
import { Plan } from './plan.entity'

@Entity({ name: 'networks' })
export class Network extends RootEntity {
  @Column({ nullable: false })
  title!: string

  @Column()
  logo_url!: string

  @Column()
  website!: string

  /** Relations */
  @OneToMany((type) => Plan, (plan) => plan.network)
  plans!: Plan[]
}
