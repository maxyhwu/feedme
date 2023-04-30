import { Client } from 'pg';
// require('dotenv').config()
import dotenv from "dotenv-defaults";
dotenv.config();

var conString = process.env.url;

const allIngredient = async (_, res) => {
    const client = new Client(conString);
    const query = `
        SELECT *
        FROM "Ingredients"
    `;
    try {
        await client.connect();
        const {rows} = await client.query(query)
        res.send({rows})
    } catch (err) {
        console.log(err)
    } finally {
        client.end();
    }
}

const allCategory = async (_,res) => {
    const client = new Client(conString);
    const query = `
        SELECT *
        FROM "Categories"
    `;
    try {
        await client.connect();
        const {rows} = await client.query(query)
        res.send({rows})
    } catch(err) {
        console.log(err)
    } finally {
        client.end();
    }
}

const allLabel = async (_,res) => {
    const client = new Client(conString);
    const query = `
        SELECT *
        FROM "Labels"
    `;
    try {
        await client.connect();
        const {rows} = await client.query(query)
        res.send({rows})
    } catch(err) {
        console.log(err)
    } finally {
        client.end();
    }
}

export { allIngredient, allCategory, allLabel };
