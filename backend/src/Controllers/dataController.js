import { Client } from 'pg';
// require('dotenv').config()
import dotenv from "dotenv-defaults";
dotenv.config();
import { pool } from '../Clients/pool'

const insertCategory = async (req, res) => {
    const query = `
                INSERT INTO "Categories" ("cateName")
                VALUES ('Vegetables'),
                       ('Dairy'),
                       ('Meat and Poultry'),
                       ('Seafood'),
                       ('Grains'),
                       ('Fruits'),
                       ('Nuts and Seeds');
            `;
    // const query = `
    //             INSERT INTO "Categories" ("cateName")
    //             VALUES ('Soures');
    //         `;
    try{
        // console.log('query', query);
        const {rows} = await pool.query(query)
        // console.log(rows)
        res.send({rows})
    } catch (e) {
        console.log("insert category error")
    }
    // query.connect(err => {
    //     if (err) throw err;
    //     else {
    //         //const query = `
    //         //INSERT INTO "Categories" ("cateName") VALUES ('banana');
    //         //TRUNCATE TABLE "Categories" RESTART IDENTITY;
    //         //`;
    //         query
    //             .query(query)
    //             .then(() => {
    //                 console.log('category insert successfully!');
    //                 client.end(console.log('Closed client connection'));
    //             })
    //             .catch(err => console.log(err))
    //             .then(() => {
    //                 console.log('Finished execution, exiting now');
    //                 process.exit();
    //             });
    //             }
    // });
}

const insertIngredient = async () => {
    const query = `
                INSERT INTO "Ingredients" ("ingredName", "expPeriod", "categoryID")
                VALUES ('Milk', 5, 2),
                       ('Beef', 6, 3),
                       ('Carrots', 15, 1),
                       ('Salmon', 15, 4),
                       ('Brown rice', 20, 5),
                       ('Apples', 7, 6),
                       ('Almonds', 10, 7),
                       ('Broccoli', 4, 1),
                       ('Chicken', 10, 3),
                       ('Yogurt', 16, 2),
                       ('Tilapia', 4, 4),
                       ('Onions', 6, 1),
                       ('Pork', 8, 3),
                       ('Oranges', 15, 6),
                       ('Oatmeal', 8, 5),
                       ('Spinach', 6, 1),
                       ('Cod', 6, 4),
                       ('Eggs', 7, 2),
                       ('Shrimp', 9, 4),
                       ('Tomatoes', 3, 1),
                       ('Cashews', 10, 7),
                       ('Lettuce', 7, 1),
                       ('Bananas', 5, 6),
                       ('White Rice', 10, 5),
                       ('Grapes', 9, 6),
                       ('Cucumber', 7, 1),
                       ('Cheddar Cheese', 10, 2),
                       ('Quinoa', 3, 5)
                       ;
            `;
    try{
        const {rows} = await pool.query(query)
        res.send({rows})
    } catch (e) {
        console.log("insert error")
    }

    // query.connect(err => {
    //     if (err) throw err;
    //     else {
    //         //TRUNCATE TABLE "Ingredients" RESTART IDENTITY;
    //         const query = `
    //             INSERT INTO "Ingredients" ("ingredName", "expPeriod", "categoryID")
    //             VALUES ('Milk', 5, 2),
    //                    ('Beef', 6, 3),
    //                    ('Carrots', 15, 1),
    //                    ('Salmon', 15, 4),
    //                    ('Brown rice', 20, 5),
    //                    ('Apples', 7, 6),
    //                    ('Almonds', 10, 7),
    //                    ('Broccoli', 4, 1),
    //                    ('Chicken', 10, 3),
    //                    ('Yogurt', 16, 2),
    //                    ('Tilapia', 4, 4),
    //                    ('Onions', 6, 1),
    //                    ('Pork', 8, 3),
    //                    ('Oranges', 15, 6),
    //                    ('Oatmeal', 8, 5),
    //                    ('Spinach', 6, 1),
    //                    ('Cod', 6, 4),
    //                    ('Eggs', 7, 2),
    //                    ('Shrimp', 9, 4),
    //                    ('Tomatoes', 3, 1),
    //                    ('Cashews', 10, 7),
    //                    ('Lettuce', 7, 1),
    //                    ('Bananas', 5, 6),
    //                    ('White Rice', 10, 5),
    //                    ('Grapes', 9, 6),
    //                    ('Cucumber', 7, 1),
    //                    ('Cheddar Cheese', 10, 2),
    //                    ('Quinoa', 3, 5)
    //                    ;
    //         `;

    //         client
    //             .query(query)
    //             .then(() => {
    //                 console.log('ingredients insert successfully!');
    //                 client.end(console.log('Closed client connection'));
    //             })
    //             .catch(err => console.log(err))
    //             .then(() => {
    //                 console.log('Finished execution, exiting now');
    //                 process.exit();
    //             });
    //             }
    // });
}

const insertLabel = async (req, res) => {

    const query = `
                INSERT INTO "Labels" ("labelName")
                VALUES ('Taiwanese'),
                       ('Japanese'),
                       ('Korean'),
                       ('French'),
                       ('American'),
                       ('Thai'),
                       ('Indian');
            `;
    try{
        const {rows} = await pool.query(query)
        res.send({rows})
    } catch (e) {
        console.log("insert category error")
    }

    // client.connect(err => {
    //     if(err) throw err;
    //     else {
    //         //const query = `
    //         //INSERT INTO "Categories" ("cateName") VALUES ('banana');
    //         //TRUNCATE TABLE "Categories" RESTART IDENTITY;
    //         //`;
    //         const query = `
    //             INSERT INTO "Labels" ("labelName")
    //             VALUES ('Taiwanese'),
    //                    ('Japanese'),
    //                    ('Korean'),
    //                    ('French'),
    //                    ('American'),
    //                    ('Thai'),
    //                    ('Indian');
    //         `;
    //         client
    //             .query(query)
    //             .then(() => {
    //                 console.log('label insert successfully!');
    //                 client.end(console.log('Closed client connection'));
    //             })
    //             .catch(err => console.log(err))
    //             .then(() => {
    //                 console.log('Finished execution, exiting now');
    //                 process.exit();
    //             });
    //     }
    // });
}

export {
    insertCategory,
    insertIngredient,
    insertLabel
}
