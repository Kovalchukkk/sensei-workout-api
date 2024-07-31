import { MigrationInterface, QueryRunner } from "typeorm";

export class InitDB1722411397735 implements MigrationInterface {
    name = 'InitDB1722411397735'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."goal_name_enum" AS ENUM('Muscle gain', 'Gain and drying')`);
        await queryRunner.query(`CREATE TABLE "goal" ("id" SERIAL NOT NULL, "name" "public"."goal_name_enum" NOT NULL, CONSTRAINT "PK_88c8e2b461b711336c836b1e130" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "fat_percentage" ("id" SERIAL NOT NULL, "min" numeric(5,2) NOT NULL, "max" numeric(5,2) NOT NULL, CONSTRAINT "PK_83e71e36166253b6e2950fb9678" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user_physics" ("id" SERIAL NOT NULL, "userId" integer NOT NULL, "goalId" integer NOT NULL, "age" integer NOT NULL, "weight" numeric(5,2) NOT NULL, "height" numeric(5,2) NOT NULL, "fatPercentageId" integer, CONSTRAINT "PK_14eaad4f493ccbcefbfb7153eb4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."user_gender_enum" AS ENUM('Man', 'Woman')`);
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "gender" "public"."user_gender_enum" NOT NULL, "isBanned" boolean NOT NULL DEFAULT false, "username" character varying NOT NULL, "password" character varying NOT NULL, "email" character varying NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE ("username"), CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."training_program_traininglevel_enum" AS ENUM('Beginner', 'Advanced')`);
        await queryRunner.query(`CREATE TABLE "training_program" ("id" SERIAL NOT NULL, "userId" integer NOT NULL, "trainingLevel" "public"."training_program_traininglevel_enum" NOT NULL, "daysPerWeek" integer NOT NULL, CONSTRAINT "REL_69cf8e4de874717ba2d3196d8b" UNIQUE ("userId"), CONSTRAINT "PK_f831b94f2ebb51dd06477b86947" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "user_physics" ADD CONSTRAINT "FK_eee19cbeb0205ecbddfae8b63f9" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_physics" ADD CONSTRAINT "FK_530ea5d7be0fbdfafd7151b289a" FOREIGN KEY ("goalId") REFERENCES "goal"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_physics" ADD CONSTRAINT "FK_bf60b11e3134c195dc95830d519" FOREIGN KEY ("fatPercentageId") REFERENCES "fat_percentage"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "training_program" ADD CONSTRAINT "FK_69cf8e4de874717ba2d3196d8b8" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "training_program" DROP CONSTRAINT "FK_69cf8e4de874717ba2d3196d8b8"`);
        await queryRunner.query(`ALTER TABLE "user_physics" DROP CONSTRAINT "FK_bf60b11e3134c195dc95830d519"`);
        await queryRunner.query(`ALTER TABLE "user_physics" DROP CONSTRAINT "FK_530ea5d7be0fbdfafd7151b289a"`);
        await queryRunner.query(`ALTER TABLE "user_physics" DROP CONSTRAINT "FK_eee19cbeb0205ecbddfae8b63f9"`);
        await queryRunner.query(`DROP TABLE "training_program"`);
        await queryRunner.query(`DROP TYPE "public"."training_program_traininglevel_enum"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TYPE "public"."user_gender_enum"`);
        await queryRunner.query(`DROP TABLE "user_physics"`);
        await queryRunner.query(`DROP TABLE "fat_percentage"`);
        await queryRunner.query(`DROP TABLE "goal"`);
        await queryRunner.query(`DROP TYPE "public"."goal_name_enum"`);
    }

}
