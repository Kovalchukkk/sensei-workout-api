import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migrations1729627906280 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "training_program" DROP CONSTRAINT "REL_69cf8e4de874717ba2d3196d8b";
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "training_program" ADD CONSTRAINT "REL_69cf8e4de874717ba2d3196d8b" UNIQUE ("userId");
        `);
  }
}
