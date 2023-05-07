import { Pool } from "pg";
// require('dotenv').config()
import dotenv from "dotenv-defaults";
dotenv.config();

var conString = process.env.url;

const pool = new Pool({
  max: 20,
  // user: process.env.user,
  // host: process.env.host,
  // database: process.env.databaseName,
  // password: process.env.password,
  // port: 5432, // The default port for PostgreSQL is 5432
  connectionString: conString,
  ssl: true
});

export {
  pool
};