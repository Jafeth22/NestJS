import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateViewingTable1739830704474 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "viewing" (
                "id" SERIAL NOT NULL,
                "when" VARCHAR NOT NULL,
                PRIMARY KEY ("id")
            );    
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE "viewing";    
        `);
    }

}
