import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1729369334275 implements MigrationInterface {
    name = 'Migrations1729369334275'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_physics" DROP CONSTRAINT "FK_530ea5d7be0fbdfafd7151b289a"`);
        await queryRunner.query(`ALTER TABLE "user_physics" ALTER COLUMN "goalId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user_physics" ADD CONSTRAINT "FK_530ea5d7be0fbdfafd7151b289a" FOREIGN KEY ("goalId") REFERENCES "goal"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_physics" DROP CONSTRAINT "FK_530ea5d7be0fbdfafd7151b289a"`);
        await queryRunner.query(`ALTER TABLE "user_physics" ALTER COLUMN "goalId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user_physics" ADD CONSTRAINT "FK_530ea5d7be0fbdfafd7151b289a" FOREIGN KEY ("goalId") REFERENCES "goal"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
