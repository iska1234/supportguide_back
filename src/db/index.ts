import "dotenv/config";

import { Pool } from "pg";
const dbConfig = {
  host: process.env["PGHOST"],
  port: Number(process.env["PGPORT"]),
  database: process.env["PGDATABASE"],
  user: process.env["PGUSER"],
  password: process.env["PGPASSWORD"],
  ssl: {
    rejectUnauthorized: false
  }
};

export const pool = new Pool(dbConfig);
export const query = (text: string, params?: (string | number | boolean)[]) => {
  return pool.query(text, params);
};
