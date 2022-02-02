import pg from "pg";

const Pool = pg.Pool;
const pool = new Pool({
  user: "postgres",
  password: "04012000",
  host: "localhost",
  port: "5432",
  database: "pern_todo",
});

export default pool;
