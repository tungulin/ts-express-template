import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('users', function (table) {
    table.string('firstName').notNullable();
    table.string('lastName').notNullable();
    table.string('languageCode');
    table.timestamp('created', { useTz: false }).defaultTo(knex.fn.now()).notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {}
