import {
  AbstractRepository,
  FindManyOptions,
  DeepPartial,
  FindOneOptions,
  FindConditions,
  EntityRepository
} from 'typeorm'
import { RootEntity, UuidEntity } from '../database/entities'
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity'
import { OrderedUUID } from '../utils/uuid'
import { CustomError } from '../utils/error'

export interface IFindManyOptions<T> extends FindManyOptions<T> {
  page?: number
}

export abstract class RootRepository<T extends RootEntity> extends AbstractRepository<T> {
  public async Create(options: DeepPartial<T>) {
    try {
      const entity = await this.repository.create(options)
      await this.manager.save(entity)

      const output = await this.FindByPk(entity.id)
      if (!output) {
        throw CustomError(500)
      }
      return Promise.resolve(output)
    } catch (err) {
      return Promise.reject(err)
    }
  }

  public async UpdateByPk(id: number, options: QueryDeepPartialEntity<T>) {
    try {
      const { affected } = await this.repository.update(id, options)
      if (affected) {
        throw CustomError(404)
      }

      return this.FindByPk(id) as Promise<T>
    } catch (err) {
      return Promise.reject(err)
    }
  }
  public async Update(condition: FindConditions<T>, schema: QueryDeepPartialEntity<T>) {
    return this.repository.update(condition, schema)
  }

  public DeleteByPk(id: number) {
    return this.repository.softDelete(id)
  }

  public FindByPk(id: number, options?: FindOneOptions<T>) {
    return this.repository.findOne(id, options)
  }
  public async All(options?: IFindManyOptions<T>) {
    try {
      let page = options?.page ?? 1
      page = isNaN(page) ? 1 : page
      page = page > 0 ? page : 1

      const take = 10
      const skip = take * (page - 1)

      const [rows, count] = await this.repository.findAndCount({
        order: { created_at: 'DESC' },
        take,
        skip,
        ...options
      })
      return Promise.resolve({ count, rows })
    } catch (err) {
      return Promise.reject(err)
    }
  }
}

@EntityRepository(UuidEntity)
export abstract class UuidRepository<T extends UuidEntity> extends RootRepository<T> {
  /**
   * uuid의 length는 무조건 32이어야 함
   */
  private ValidateUuid(uuid: string): void {
    if (uuid.length !== 32) {
      throw CustomError(404)
    }
  }

  public async FindByUuid(uuid: string, options?: FindOneOptions<T>) {
    try {
      this.ValidateUuid(uuid)

      return this.repository.findOne({
        ...options,
        where: { uuid: OrderedUUID.ToBinary(uuid) }
      })
    } catch (err) {
      return Promise.reject(err)
    }
  }

  public async UpdateByUuid(uuid: string, schema: QueryDeepPartialEntity<T>) {
    try {
      this.ValidateUuid(uuid)

      const { affected } = await this.repository
        .createQueryBuilder()
        .update(schema)
        .where('uuid = :uuid', { uuid: OrderedUUID.ToBinary(uuid) })
        .execute()

      if (!affected) {
        throw CustomError(404)
      }

      return this.FindByUuid(uuid) as Promise<T>
    } catch (err) {
      return Promise.reject(err)
    }
  }

  public DeleteByUuid(uuid: string) {
    // return this.repository.softDelete({ uuid: OrderedUUID.ToBinary(uuid) })

    this.ValidateUuid(uuid)

    return this.repository
      .createQueryBuilder()
      .softDelete()
      .where('uuid = :uuid', { uuid: OrderedUUID.ToBinary(uuid) })
      .execute()
  }
}
