import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1729367788353 implements MigrationInterface {
    name = 'Migrations1729367788353'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TYPE "public"."goal_name_enum" RENAME TO "goal_name_enum_old"`);
        await queryRunner.query(`CREATE TYPE "public"."goal_name_enum" AS ENUM('Gain', 'Recomposition', 'Dry')`);
        await queryRunner.query(`ALTER TABLE "goal" ALTER COLUMN "name" TYPE "public"."goal_name_enum" USING "name"::"text"::"public"."goal_name_enum"`);
        await queryRunner.query(`DROP TYPE "public"."goal_name_enum_old"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."goal_name_enum_old" AS ENUM('Muscle gain', 'Gain and drying')`);
        await queryRunner.query(`ALTER TABLE "goal" ALTER COLUMN "name" TYPE "public"."goal_name_enum_old" USING "name"::"text"::"public"."goal_name_enum_old"`);
        await queryRunner.query(`DROP TYPE "public"."goal_name_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."goal_name_enum_old" RENAME TO "goal_name_enum"`);
    }

}
