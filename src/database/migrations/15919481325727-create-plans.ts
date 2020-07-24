import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class CreatePlan1591948132527 implements MigrationInterface {
  async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'plans',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true
          }
        ]
      }),
      true
    )
  }

  async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('plans')
  }
}
