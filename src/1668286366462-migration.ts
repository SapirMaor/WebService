import { MigrationInterface, QueryRunner } from "typeorm";

export class migration1668286366462 implements MigrationInterface {
    name = 'migration1668286366462'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "division" (
                "id" SERIAL NOT NULL,
                CONSTRAINT "PK_b6f0d207e38106dbddabab3a078" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "agent" (
                "id" SERIAL NOT NULL,
                "divisionIdId" integer,
                CONSTRAINT "PK_1000e989398c5d4ed585cf9a46f" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "message" (
                "id" SERIAL NOT NULL,
                "content" character varying NOT NULL,
                "done" boolean NOT NULL,
                "divisionIdId" integer,
                CONSTRAINT "PK_ba01f0a3e0123651915008bc578" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "dispatch" (
                "id" SERIAL NOT NULL,
                "timestamp" TIMESTAMP NOT NULL DEFAULT now(),
                "messageIdId" integer,
                "agentIdId" integer,
                CONSTRAINT "REL_db05de2a50042b87000d3c5855" UNIQUE ("messageIdId"),
                CONSTRAINT "PK_f2c29333b8ffa14a1414142fc55" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            ALTER TABLE "agent"
            ADD CONSTRAINT "FK_3f19c28e1738aa2995c5321cdc2" FOREIGN KEY ("divisionIdId") REFERENCES "division"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "message"
            ADD CONSTRAINT "FK_168da02021cd821b0c835161473" FOREIGN KEY ("divisionIdId") REFERENCES "division"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "dispatch"
            ADD CONSTRAINT "FK_db05de2a50042b87000d3c5855d" FOREIGN KEY ("messageIdId") REFERENCES "message"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "dispatch"
            ADD CONSTRAINT "FK_5bf6b37d96ecf811ea7b30fb49d" FOREIGN KEY ("agentIdId") REFERENCES "agent"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "dispatch" DROP CONSTRAINT "FK_5bf6b37d96ecf811ea7b30fb49d"
        `);
        await queryRunner.query(`
            ALTER TABLE "dispatch" DROP CONSTRAINT "FK_db05de2a50042b87000d3c5855d"
        `);
        await queryRunner.query(`
            ALTER TABLE "message" DROP CONSTRAINT "FK_168da02021cd821b0c835161473"
        `);
        await queryRunner.query(`
            ALTER TABLE "agent" DROP CONSTRAINT "FK_3f19c28e1738aa2995c5321cdc2"
        `);
        await queryRunner.query(`
            DROP TABLE "dispatch"
        `);
        await queryRunner.query(`
            DROP TABLE "message"
        `);
        await queryRunner.query(`
            DROP TABLE "agent"
        `);
        await queryRunner.query(`
            DROP TABLE "division"
        `);
    }

}
