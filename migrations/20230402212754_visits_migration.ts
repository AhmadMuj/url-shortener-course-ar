import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("visits", (table) => {
    table.increments("id").primary();
    table
      .string("url_id")
      .references("id")
      .inTable("urls")
      .onDelete("CASCADE")
      .notNullable();
    table.string("ip").notNullable();
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable("visits");
}
