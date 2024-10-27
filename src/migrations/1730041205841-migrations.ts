import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1730041205841 implements MigrationInterface {
    name = 'Migrations1730041205841'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "training_program" DROP CONSTRAINT "FK_69cf8e4de874717ba2d3196d8b8"`);
        await queryRunner.query(`ALTER TABLE "training_program" ADD CONSTRAINT "UQ_69cf8e4de874717ba2d3196d8b8" UNIQUE ("userId")`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "password" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "training_program" ADD CONSTRAINT "FK_69cf8e4de874717ba2d3196d8b8" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "training_program" DROP CONSTRAINT "FK_69cf8e4de874717ba2d3196d8b8"`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "password" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "training_program" DROP CONSTRAINT "UQ_69cf8e4de874717ba2d3196d8b8"`);
        await queryRunner.query(`ALTER TABLE "training_program" ADD CONSTRAINT "FK_69cf8e4de874717ba2d3196d8b8" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
