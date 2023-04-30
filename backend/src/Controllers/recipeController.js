// import recipesModel from "../Model/recipesModel";

// exports.getRecipeByName = async (req, res) => {
//   const recipeName = req.query.recipeName;
//   try {
//     const info = await recipesModel.findAll({
//       where: { recipeName: recipeName }, // where 條件
//       attribute: [], //指定回傳欄位
//     });
//     console.log(info);
//     // res.status(200).send({ message: "success", contents: info });
//   } catch (err) {
//     console.log(err);
//     // res.status(403).send({ message: "error", contents: [] });
//   }
// };

import { Client } from 'pg';
// require('dotenv').config()
import dotenv from "dotenv-defaults";
dotenv.config();

var conString = process.env.url;

const qeuryByID = async (req, res) => {
    const {id} = req.query;
    const client = new Client(conString);
    const query = 'SELECT * FROM "Recipes" WHERE id = ' + str(id);
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

const qeuryByName = async (req, res) => {

}

const queryByLabel = async (req, res) => {

}

const queryTopLikeCount = async (req, res) => {

}

export { qeuryByID, qeuryByName, queryByLabel, queryTopLikeCount }