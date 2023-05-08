import Knex from "knex";

const knex = Knex({
  client: "postgresql",
  connection: {
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
  },
});

export const onDatabaseConnect = async () => knex.raw("SELECT 1");

export default knex;
