import { MigrationInterface, QueryRunner } from 'typeorm'
import { getCustomRepository } from 'typeorm'
import { UserRepository } from '../../repositories/user.repository'

export class CreateUser1591948132527 implements MigrationInterface {
  async up(queryRunner: QueryRunner): Promise<void> {
    try {
      const userRepository = getCustomRepository(UserRepository)
      await userRepository.Create({ email: 'test@empoapp.com' })
      await userRepository.Create({ email: 'empee@empoapp.com' })
      await userRepository.Create({ email: 'emper@empoapp.com' })
    } catch (err) {
      console.log(err)
    }
  }

  async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('users')
  }
}
