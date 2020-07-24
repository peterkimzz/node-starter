import { Connection, getCustomRepository } from 'typeorm'

import { Seeder, Factory } from 'typeorm-seeding'
import { Telecom } from '../entities/telecom.entity'
import { OrderedUUID } from '../../utils/uuid'
import { TelecomRepository } from '../../repositories/telecom.repository'

export default class CreatePlan implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    const telecomRepo = getCustomRepository(TelecomRepository)

    const telecoms = await telecomRepo.All()
    if (telecoms.count > 0) {
      return Promise.resolve()
    }

    await connection
      .createQueryBuilder()
      .insert()
      .into(Telecom)
      .values([
        {
          uuid: OrderedUUID.Generate(),
          title: 'LG 헬로모바일',
          website: 'http://mobile.lghellovision.net',
          logo_url: 'https://empoapp.s3.ap-northeast-2.amazonaws.com/public/telecoms/logo_skt.png'
        },
        {
          uuid: OrderedUUID.Generate(),
          title: '이야기알뜰폰',
          website: 'https://www.eyagi.co.kr',
          logo_url: 'https://empoapp.s3.ap-northeast-2.amazonaws.com/public/telecoms/logo_kt.png'
        },
        {
          uuid: OrderedUUID.Generate(),
          title: '스마텔',
          website: 'https://www.smartelmall.com/',
          logo_url: 'https://empoapp.s3.ap-northeast-2.amazonaws.com/public/telecoms/logo_lg.png'
        },
        {
          uuid: OrderedUUID.Generate(),
          title: 'FreeT',
          website: 'http://www.freet.co.kr',
          logo_url: 'https://empoapp.s3.ap-northeast-2.amazonaws.com/public/telecoms/logo_lg.png'
        },
        {
          uuid: OrderedUUID.Generate(),
          title: 'tplus모바일',
          website: 'https://www.tplusmobile.com',
          logo_url: 'https://empoapp.s3.ap-northeast-2.amazonaws.com/public/telecoms/logo_lg.png'
        },
        {
          uuid: OrderedUUID.Generate(),
          title: '아이즈모바일',
          website: 'http://www.eyes.co.kr',
          logo_url: 'https://empoapp.s3.ap-northeast-2.amazonaws.com/public/telecoms/logo_lg.png'
        },
        {
          uuid: OrderedUUID.Generate(),
          title: '모빙',
          website: 'https://www.mobing.co.kr',
          logo_url: 'https://empoapp.s3.ap-northeast-2.amazonaws.com/public/telecoms/logo_lg.png'
        },
        {
          uuid: OrderedUUID.Generate(),
          title: 'U+ 알뜰',
          website: 'https://www.uplussave.com',
          logo_url: 'https://empoapp.s3.ap-northeast-2.amazonaws.com/public/telecoms/logo_lg.png'
        },
        {
          uuid: OrderedUUID.Generate(),
          title: '카카오 PinPlay',
          website: 'https://www.pinplay.co.kr',
          logo_url: 'https://empoapp.s3.ap-northeast-2.amazonaws.com/public/telecoms/logo_lg.png'
        }
      ])
      .execute()
  }
}
