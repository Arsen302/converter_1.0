import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddUserIDColumnToPhotosTable1611226095681
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'photos',
      new TableColumn({
        name: 'userId',
        type: 'int',
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('photos', 'userId');
  }
}
