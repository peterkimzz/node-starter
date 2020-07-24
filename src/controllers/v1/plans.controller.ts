import { IController } from '..'

import { CustomError } from '../../utils/error'
import { CustomResponse } from '../../utils/response'
import { getCustomRepository } from 'typeorm'
import { PlanRepository } from '../../repositories/plan.repository'
import { TelecomRepository } from '../../repositories/telecom.repository'
import { NetworkRepository } from '../../repositories/network.repository'
import { FrequencyRepository } from '../../repositories/frequency.repository'
import { PaymentTypeRepository } from '../../repositories/payment_type.repository'
import { Plan } from '../../database/entities/plan.entity'
import { PlanPrivilegeRepository } from '../../repositories/plan_previlege.repository'
import { PlanContractQualificationRepository } from '../../repositories/plan_contract_qualification.repository'

export const Get: IController = async (req, res, next) => {
  const {} = req.body

  const planRepo = getCustomRepository(PlanRepository)

  const networkRepo = getCustomRepository(NetworkRepository)
  const telecomRepo = getCustomRepository(TelecomRepository)
  const frequencyRepo = getCustomRepository(FrequencyRepository)
  const paymentTypeRepo = getCustomRepository(PaymentTypeRepository)

  const planPrevilegeRepo = getCustomRepository(PlanPrivilegeRepository)
  const planContractQualifcationRepo = getCustomRepository(PlanContractQualificationRepository)

  try {
    const plans = await planRepo.All()

    const promises = plans.rows.map(async (plan) => {
      try {
        const [network, telecom, frequency, payment_type, previleges, contract_qualifications] = await Promise.all([
          networkRepo.FindByPk(plan.network_id),
          telecomRepo.FindByPk(plan.telecom_id),
          frequencyRepo.FindByPk(plan.frequency_id),
          paymentTypeRepo.FindByPk(plan.payment_type_id),
          planPrevilegeRepo.FindByPlanId(plan.id),
          planContractQualifcationRepo.FindByPlanId(plan.id)
        ])

        if (!network) {
          throw CustomError('network join error')
        }
        if (!telecom) {
          throw CustomError('telecom join error')
        }
        if (!frequency) {
          throw CustomError('frequency join error')
        }
        if (!payment_type) {
          throw CustomError('payment_type join error')
        }

        plan.network = network.ToClient()
        plan.telecom = telecom.ToClient()
        plan.frequency = frequency.ToClient()
        plan.payment_type = payment_type.ToClient()

        plan.privileges = previleges.rows.map((row) => row.ToClient())
        plan.contract_qualifications = contract_qualifications.rows.map((row) => row.ToClient())

        return plan.ToClient()
      } catch (err) {
        return next(err)
      }
    })

    plans.rows = await Promise.all(promises as Promise<Plan>[])

    return CustomResponse(res, { plans })
  } catch (err) {
    next(err)
  }
}
