import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateUsersTable1611069828380 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'users',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isNullable: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'fullName',
            type: 'varchar',
          },
          {
            name: 'login',
            type: 'varchar',
          },
          {
            name: 'password',
            type: 'varchar',
          },
          {
            name: 'createdAt',
            type: 'date',
            isNullable: true,
            default: 'now()',
          },
          {
            name: 'updatedAt',
            type: 'date',
            isNullable: true,
          },
          {
            name: 'deletedAt',
            type: 'date',
            isNullable: true,
          },
        ],
      }),
      true
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('users');
  }
}
