import { MigrationInterface, QueryRunner } from 'typeorm'

export class CreateFieldTextContent1738887189371 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TYPE "content_type_enum" AS ENUM ('video', 'image', 'pdf', 'link', 'text')
    `)

    await queryRunner.query(`
      ALTER TABLE contents
        ADD COLUMN text_content TEXT,
        ALTER COLUMN url DROP NOT NULL,
        ALTER COLUMN description DROP NOT NULL,
        ALTER COLUMN cover DROP NOT NULL,
        ALTER COLUMN type TYPE content_type_enum USING type::content_type_enum
    `)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE contents
        DROP COLUMN text_content,
        ALTER COLUMN url SET NOT NULL,
        ALTER COLUMN description SET NOT NULL,
        ALTER COLUMN cover SET NOT NULL,
        ALTER COLUMN type TYPE VARCHAR
    `)

    await queryRunner.query(`
      DROP TYPE "content_type_enum"
    `)
  }
}
