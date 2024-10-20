import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1729367834932 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            INSERT INTO "goal" ("name") VALUES
            ('Gain'),
            ('Recomposition'),
            ('Dry');
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DELETE FROM "goal" WHERE "name" IN ('Gain', 'Recomposition', 'Dry');
        `);
    }
}
