import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1729369560567 implements MigrationInterface {
    name = 'Migrations1729369560567'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_physics" ALTER COLUMN "age" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user_physics" ALTER COLUMN "weight" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user_physics" ALTER COLUMN "height" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_physics" ALTER COLUMN "height" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user_physics" ALTER COLUMN "weight" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user_physics" ALTER COLUMN "age" SET NOT NULL`);
    }

}
