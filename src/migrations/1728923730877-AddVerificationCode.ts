import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddVerificationCode1728923730877 implements MigrationInterface {
  name = 'AddVerificationCode1728923730877';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" ADD "verificationCode" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ALTER COLUMN "username" DROP NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" ALTER COLUMN "username" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" DROP COLUMN "verificationCode"`,
    );
  }
}
