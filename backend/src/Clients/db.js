import { Pool } from "pg";
// require('dotenv').config()
import dotenv from "dotenv-defaults";
dotenv.config();

const pool = new Pool({
  user: process.env.user,
  host: process.env.host,
  database: process.env.databaseName,
  password: process.env.password,
  port: 5432, // The default port for PostgreSQL is 5432
});

module.exports = {
  query: (text, params, callback) => {
    return pool.query(text, params, callback);
  }
};