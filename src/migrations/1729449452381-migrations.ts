import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1729449452381 implements MigrationInterface {
    name = 'Migrations1729449452381'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "fat_percentage" ADD "userId" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "fat_percentage" ADD "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "fat_percentage" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "fat_percentage" DROP COLUMN "userId"`);
    }

}
