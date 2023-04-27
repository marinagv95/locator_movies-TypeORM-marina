import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateMoviesTable1682528523927 implements MigrationInterface {
    name = 'CreateMoviesTable1682528523927'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "movies" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "movies" DROP COLUMN "deletedAt"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "movies" ADD "deletedAt" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "movies" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
    }

}
