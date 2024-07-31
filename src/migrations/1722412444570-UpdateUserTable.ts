import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateUserTable1722412444570 implements MigrationInterface {
    name = 'UpdateUserTable1722412444570'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "gender" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "gender" SET NOT NULL`);
    }

}
