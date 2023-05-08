import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("urls", (table) => {
    table
      .string("id")
      .defaultTo(knex.raw("substring(md5(random()::text) from 0 for 7)"))
      .primary();
    table.text("url").notNullable();
    table
      .integer("user_id")
      .references("id")
      .inTable("users")
      .onDelete("CASCADE")
      .notNullable();
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable("urls");
}
