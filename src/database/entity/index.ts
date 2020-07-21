import {
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  Column,
  Index,
  BeforeInsert,
  AfterLoad
} from 'typeorm'
import moment from 'moment'
import { OrderedUUID } from '../../utils/uuid'

interface IRootEntity {
  id: number
  created_at: Date
  updated_at: Date
  deleted_at: Date
  created_at_from_now: string
  updated_at_from_now: string
}
interface IUuidEntity {
  uuid: Buffer | string
  StringToBuffer: () => void
  BufferToString: () => void
}

//#region Abstract Entities
export abstract class RootEntity implements IRootEntity {
  @PrimaryGeneratedColumn()
  id!: number

  @CreateDateColumn()
  created_at!: Date

  @UpdateDateColumn({ onUpdate: 'CURRENT_TIMESTAMP(6)' })
  updated_at!: Date

  @DeleteDateColumn()
  deleted_at!: Date

  created_at_from_now!: string
  updated_at_from_now!: string

  ToClient() {
    const values = Object.assign({}, this)

    delete values.id
    delete values.deleted_at

    values.created_at_from_now = moment(values.created_at).fromNow()
    values.updated_at_from_now = moment(values.updated_at).fromNow()

    return values
  }
}

/**
 * BaseEntity에서 UUID가 필요한 테이블 구조
 */
export abstract class UuidEntity extends RootEntity implements IRootEntity, IUuidEntity {
  @Column({ type: 'binary', length: 16 })
  @Index({ unique: true })
  uuid!: Buffer | string

  @BeforeInsert()
  StringToBuffer() {
    const uuid = OrderedUUID.Generate()
    this.uuid = OrderedUUID.ToBinary(uuid)
  }

  @AfterLoad()
  BufferToString() {
    this.uuid = OrderedUUID.ToString(this.uuid as Buffer)
  }
}
//#endregion
