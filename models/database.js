import pg from "pg";

const client = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "api",
  password: "root",
  port: 5432,
});

client.connect();

export default client;
