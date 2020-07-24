import { Connection, getCustomRepository } from 'typeorm'

import { Seeder, Factory } from 'typeorm-seeding'
import { NetworkRepository } from '../../repositories/network.repository'
import { Network } from '../entities/network.entity'

export default class CreatePlan implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    const networkRepo = getCustomRepository(NetworkRepository)
    const networks = await networkRepo.All()
    if (networks.count > 0) {
      return Promise.resolve()
    }

    await connection
      .createQueryBuilder()
      .insert()
      .into(Network)
      .values([
        {
          title: 'SKT',
          logo_url: 'https://empoapp.s3.ap-northeast-2.amazonaws.com/public/telecoms/logo_skt.png',
          website: ''
        },
        {
          title: 'KT',
          logo_url: 'https://empoapp.s3.ap-northeast-2.amazonaws.com/public/telecoms/logo_kt.png',
          website: ''
        },
        {
          title: 'LG',
          logo_url: 'https://empoapp.s3.ap-northeast-2.amazonaws.com/public/telecoms/logo_lg.png',
          website: ''
        }
      ])
      .execute()
  }
}
