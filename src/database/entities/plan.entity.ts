import { Entity, Column, OneToMany, ManyToOne, JoinColumn } from 'typeorm'

import { UuidEntity } from '.'
import { Telecom } from './telecom.entity'
import { Network } from './network.entity'
import { Frequency } from './frequency.entity'
import { PlanPrivilege } from './plan_privilege.entity'
import { PaymentType } from './payment_type.entity'
import { PlanContractQualification } from './plan_contract_qualification.entity'

@Entity({ name: 'plans' })
export class Plan extends UuidEntity {
  @ManyToOne((type) => Network, (network) => network.plans, { nullable: false })
  @JoinColumn({ name: 'network_id' })
  network!: Network
  @Column({ nullable: false })
  network_id!: number

  @ManyToOne((type) => Telecom, (telecom) => telecom.plans, { nullable: false })
  @JoinColumn({ name: 'telecom_id' })
  telecom!: Telecom
  @Column({ nullable: false })
  telecom_id!: number

  @ManyToOne((type) => Frequency, (frequency) => frequency.plans, { nullable: false })
  @JoinColumn({ name: 'frequency_id' })
  frequency!: Frequency
  @Column({ nullable: false })
  frequency_id!: number

  @ManyToOne((type) => PaymentType, (payment_type) => payment_type.plans, { nullable: false })
  @JoinColumn({ name: 'payment_type_id' })
  payment_type!: PaymentType
  @Column({ nullable: false })
  payment_type_id!: number

  @Column()
  title!: string

  @Column()
  link!: string

  @Column()
  wifi!: string

  @Column()
  price!: string

  @Column()
  price_promotion_event!: string

  @Column()
  price_promotion_contract!: string

  @Column()
  double_promo!: string

  @Column()
  initial_data_amount!: string

  @Column()
  initial_data_mvoip!: string

  @Column()
  initial_data_daily!: string

  @Column()
  initial_data_speedlimit!: string

  @Column()
  initial_data_else!: string

  @Column()
  initial_voice_amount!: string

  @Column()
  initial_voice_additional!: string

  @Column()
  initial_message!: string

  @Column()
  additionalfee_voice!: string

  @Column()
  additionalfee_face!: string

  @Column()
  additionalfee_sms!: string

  @Column()
  additionalfee_mms_text!: string

  @Column()
  additionalfee_mms_multi!: string

  @Column()
  additionalfee_data!: string

  /** Relations */
  @OneToMany((type) => PlanPrivilege, (plan_previlege) => plan_previlege.plan_id)
  privileges!: PlanPrivilege[]

  @OneToMany((type) => PlanContractQualification, (pcq) => pcq.plan_id)
  contract_qualifications!: PlanPrivilege[]

  ToClient() {
    const values = super.ToClient()

    delete values.network_id
    delete values.telecom_id
    delete values.frequency_id
    delete values.payment_type_id

    return values
  }
}
