import XLSX from 'xlsx'
import { IController } from '..'

import { CustomError } from '../../utils/error'
import { CustomResponse } from '../../utils/response'
import { getCustomRepository } from 'typeorm'
import { PlanRepository } from '../../repositories/plan.repository'
import { NetworkRepository } from '../../repositories/network.repository'
import { TelecomRepository } from '../../repositories/telecom.repository'
import { PaymentTypeRepository } from '../../repositories/payment_type.repository'
import { FrequencyRepository } from '../../repositories/frequency.repository'
import { PlanPrivilegeRepository } from '../../repositories/plan_previlege.repository'
import { PlanContractQualificationRepository } from '../../repositories/plan_contract_qualification.repository'

interface IPlan {
  link?: string
  title?: string
  telecom?: string
  network?: string
  ' price '?: string
  ' price_promotion_event '?: string
  ' price_promotion_contract '?: string
  ' double_promo '?: string
  initial_data_amount?: string
  initial_data_mvoip?: string
  initial_data_daily?: string
  initial_data_speedlimit?: string
  initial_data_else?: string
  initial_voice_amount?: string
  initial_voice_additional?: string
  initial_message?: string
  additionalfee_voice?: string
  additionalfee_face?: string
  additionalfee_sms?: string
  additionalfee_mms_text?: string
  additionalfee_mms_multi?: string
  additionalfee_data?: string
  frequency: string
  payment_type?: string
  wifi?: string
  contract_qualification?: string
  __EMPTY?: string
  __EMPTY_1?: string
  __EMPTY_2?: string
  __EMPTY_3?: string
  __EMPTY_4?: string
  privilege: string
}

export const Get: IController = async (req, res, next) => {
  const planRepo = getCustomRepository(PlanRepository)

  const networkRepo = getCustomRepository(NetworkRepository)
  const telecomRepo = getCustomRepository(TelecomRepository)
  const paymentTypeRepo = getCustomRepository(PaymentTypeRepository)
  const frequencyRepo = getCustomRepository(FrequencyRepository)

  const planPrevilegeRepo = getCustomRepository(PlanPrivilegeRepository)
  const planContractQualificationRepo = getCustomRepository(PlanContractQualificationRepository)

  try {
    const workbook = XLSX.readFile('plan.xlsx')
    const sheet_name_list = workbook.SheetNames

    const raw_plans: IPlan[] = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]])

    const Insert = async (rows: IPlan[]) => {
      for await (const row of rows) {
        try {
          console.log(`"${row.title}" 레코드 시작`)

          if (!row['network']) {
            throw CustomError(500, 'network missing')
          }
          if (!row['telecom']) {
            throw CustomError(500, 'network missing')
          }
          if (!row['payment_type']) {
            throw CustomError(500, 'network missing')
          }
          if (!row['frequency']) {
            throw CustomError(500, 'frequency missing')
          }

          const network = await networkRepo.FindByTitle(row.network)
          const telecom = await telecomRepo.FindByTitle(row.telecom)
          const payment_type = await paymentTypeRepo.FindByTitle(row.payment_type)
          const frequency = await frequencyRepo.FindByTitle(row.frequency)

          const plan = await planRepo.Create({
            network_id: network?.id,
            telecom_id: telecom?.id,
            payment_type_id: payment_type?.id,
            frequency_id: frequency?.id,
            title: row['title'],
            link: row['link'],
            wifi: row['wifi'],
            price: row[' price '],
            price_promotion_event: row[' price_promotion_event '],
            price_promotion_contract: row[' price_promotion_contract '],
            double_promo: row[' double_promo '],
            initial_data_amount: row['initial_data_amount'],
            initial_data_mvoip: row['initial_data_mvoip'],
            initial_data_daily: row['initial_data_daily'],
            initial_data_speedlimit: row['initial_data_speedlimit'],
            initial_data_else: row['initial_data_else'],
            initial_voice_amount: row['initial_voice_amount'],
            initial_voice_additional: row['initial_voice_additional'],
            initial_message: row['initial_message'],
            additionalfee_voice: row['additionalfee_voice'],
            additionalfee_face: row['additionalfee_face'],
            additionalfee_sms: row['additionalfee_sms'],
            additionalfee_mms_text: row['additionalfee_mms_text'],
            additionalfee_mms_multi: row['additionalfee_mms_multi'],
            additionalfee_data: row['additionalfee_data']
          })

          if (row['contract_qualification']) {
            await planPrevilegeRepo.Create({ plan_id: plan.id, title: row['contract_qualification'] })
          }
          if (row['__EMPTY']) {
            await planPrevilegeRepo.Create({ plan_id: plan.id, title: row['__EMPTY'] })
          }
          if (row['__EMPTY_1']) {
            await planPrevilegeRepo.Create({ plan_id: plan.id, title: row['__EMPTY_1'] })
          }
          if (row['__EMPTY_2']) {
            await planPrevilegeRepo.Create({ plan_id: plan.id, title: row['__EMPTY_2'] })
          }
          if (row['__EMPTY_3']) {
            await planPrevilegeRepo.Create({ plan_id: plan.id, title: row['__EMPTY_3'] })
          }
          if (row['__EMPTY_4']) {
            await planPrevilegeRepo.Create({ plan_id: plan.id, title: row['__EMPTY_4'] })
          }

          if (row['privilege']) {
            await planContractQualificationRepo.Create({ plan_id: plan.id, title: row['privilege'] })
          }
        } catch (err) {
          return next(err)
        }
      }
    }

    await Insert(raw_plans)

    return CustomResponse(res, { successs: true })
  } catch (err) {
    return next(err)
  }
}
