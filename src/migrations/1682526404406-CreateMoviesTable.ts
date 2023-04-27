import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateMoviesTable1682526404406 implements MigrationInterface {
    name = 'CreateMoviesTable1682526404406'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "movies" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "movies" ADD "deletedAt" TIMESTAMP`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "movies" DROP COLUMN "deletedAt"`);
        await queryRunner.query(`ALTER TABLE "movies" DROP COLUMN "createdAt"`);
    }

}
