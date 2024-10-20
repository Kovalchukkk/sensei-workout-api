import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateStepTable1729367207602 implements MigrationInterface {
    name = 'CreateStepTable1729367207602'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "step" ("id" SERIAL NOT NULL, "userId" integer NOT NULL, "count" integer NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_70d386ace569c3d265e05db0cc7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "training_program" ADD "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "user_physics" ADD "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "step" ADD CONSTRAINT "FK_9f10ae1381e1de448556ee036f5" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "step" DROP CONSTRAINT "FK_9f10ae1381e1de448556ee036f5"`);
        await queryRunner.query(`ALTER TABLE "user_physics" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "training_program" DROP COLUMN "createdAt"`);
        await queryRunner.query(`DROP TABLE "step"`);
    }

}
