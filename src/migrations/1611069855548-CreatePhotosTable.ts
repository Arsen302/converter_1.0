import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreatePhotosTable1611069855548 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'photos',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isNullable: false,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'name',
            type: 'varchar',
          },
          {
            name: 'convertedName',
            type: 'varchar',
          },
          {
            name: 'clientName',
            type: 'varchar',
          },
          {
            name: 'url',
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
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('photos');
  }
}
