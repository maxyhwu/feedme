import { Client } from 'pg';
// require('dotenv').config()
import dotenv from "dotenv-defaults";
dotenv.config();

var conString = process.env.url;

const allIngredient = async (_, res) => {
    const client = new Client(conString);
    const query = `
        SELECT *
        FROM "Categories"
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

const allCategory = () => {
    
}

const allLabel = () => {

}

export default { allIngredient, allCategory, allLabel };