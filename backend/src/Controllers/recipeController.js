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

const qeuryByID = (req, res) => {
    const client = new Client(conString);

    client.connect(err => {
        if (err) throw err;
        else {
            const query = `
                SELECT *
                FROM "Recipes"
            `;
            client
                .query(query)
                .then(() => {
                    console.log('all ingredient query successfully!');
                    client.end(console.log('Closed client connection'));
                })
                .catch(err => console.log(err))
                .then(() => {
                    console.log('Finished execution, exiting now');
                    process.exit();
                });
                }
    });
}

export { qeuryByID, qeuryByName, queryByLabel }