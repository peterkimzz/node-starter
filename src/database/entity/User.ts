import { Entity, Column, Index, OneToMany } from 'typeorm'
import { IsEmail } from 'class-validator'

import { UuidEntity } from '.'

@Entity({ name: 'users' })
export class User extends UuidEntity {
  @Column()
  @Index()
  @IsEmail()
  email!: string

  @Column()
  username!: string
}
