// import { Client } from 'pg';
import { pool } from '../Clients/pool'

// require('dotenv').config()
import dotenv from "dotenv-defaults";
dotenv.config();

var conString = process.env.url;

const allIngredient = async (_, res) => {
    // const client = new Client(conString);
    const query = `
        SELECT *
        FROM "Ingredients"
    `;
    try {
        // await client.connect();
        const {rows} = await pool.query(query)
        res.send({rows})
    } catch (err) {
        console.log(err)
    }
}

const allCategory = async (_,res) => {
    // const client = new Client(conString);
    const query = `
        SELECT *
        FROM "Categories"
    `;
    try {
        // await client.connect();
        const {rows} = await pool.query(query)
        console.log(rows);
        res.send({rows})
    } catch(err) {
        console.log(err)
    }
}

const allLabel = async (_,res) => {
    // const client = new Client(conString);
    const query = `
        SELECT *
        FROM "Labels"
    `;
    try {
        // await client.connect();
        const {rows} = await pool.query(query)
        res.send({rows})
    } catch(err) {
        console.log(err)
    }
}

export { allIngredient, allCategory, allLabel };
