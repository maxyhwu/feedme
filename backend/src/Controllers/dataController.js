// import { Client } from 'pg';
// require('dotenv').config()
import dotenv from "dotenv-defaults";
dotenv.config();
import { pool } from '../Clients/pool'

const insertCategory = async (_, res) => {
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
    try{
        // console.log('query', query);
        const {rows} = await pool.query(query)
        // console.log(rows)
        res.send({rows})
    } catch (e) {
        console.log("insert category error")
        console.log(e)
    }
}

const updataUserLike = async (_, res) => {
    const query = `
                Update "Users" Set "like" = $1 where "like" IS NULL;
            `;
    try{
        // console.log('query', query);
        const {rows} = await pool.query(query, [[]])
        // console.log(rows)
        res.send({rows})
    } catch (e) {
        console.log("insert category error")
    }
}

const insertIngredient = async () => {
    const query = `
                INSERT INTO "Ingredients" ("ingredName", "expPeriod", "categoryID")
                VALUES ('Milk', 5, 2), ('Eggs', 21, 2), ('Flour', 240, 5), ('Sugar', 365, 5), ('Salt', 3650, 5), ('Butter', 14, 2), ('Chicken', 2, 3), ('Beef', 5, 3), ('Rice', 365, 5), ('Pasta', 365, 5), ('Canned tomatoes', 730, 5), ('Canned beans', 1095, 5), ('Olive oil', 365, 5), ('Vinegar', 1095, 5), ('Honey', 3650, 5), ('Yogurt', 14, 2), ('Oats', 365, 5), ('Cabbage', 14, 1), ('Carrots', 21, 1), ('Onions', 60, 1), ('Potatoes', 60, 1), ('Apples', 30, 6), ('Oranges', 14, 6), ('Lemons', 30, 6), ('Bananas', 7, 6), ('Tomatoes', 7, 6), ('Lettuce', 7, 1), ('Spinach', 7, 1), ('Broccoli', 7, 1), ('Cauliflower', 7, 1), ('Cucumbers', 7, 1), ('Bell peppers', 7, 1), ('Celery', 7, 1), ('Mushrooms', 7, 1), ('Cheese', 14, 2), ('Yogurt', 14, 2), ('Mozzarella', 14, 2), ('Cream', 7, 2), ('Buttermilk', 7, 2), ('Cheddar', 30, 2), ('Parmesan', 30, 2), ('Ham', 7, 3), ('Bacon', 7, 3), ('Ground beef', 3, 3), ('Pork chops', 3, 3), ('Chicken breasts', 2, 3), ('Chicken thighs', 2, 3), ('Salmon', 2, 4), ('Tuna', 2, 4), ('Shrimp', 1, 4), ('Crab', 1, 4), ('Lobster', 1, 4), ('Scallops', 1, 4), ('Lamb', 3, 3), ('Turkey', 3, 3), ('Quinoa', 365, 5), ('Brown rice', 365, 5), ('Barley', 365, 5), ('Whole wheat bread', 7, 5), ('White bread', 7, 5), ('Corn', 7, 1), ('Grapes', 7, 6), ('Strawberries', 3, 6), ('Blueberries', 5, 6), ('Raspberries', 2, 6), ('Blackberries', 3, 6), ('Peaches', 3, 6), ('Plums', 3, 6), ('Pineapple', 5, 6), ('Watermelon', 7, 6), ('Mangoes', 5, 6), ('Avocado', 5, 6), ('Almonds', 365, 7), ('Walnuts', 365, 7), ('Peanuts', 180, 7), ('Cashews', 365, 7), ('Pistachios', 365, 7), ('Flaxseeds', 180, 7), ('Chia seeds', 365, 7), ('Sesame seeds', 365, 7), ('Sunflower seeds', 365, 7), ('Pumpkin seeds', 365, 7), ('Hazelnuts', 180, 7), ('Chestnuts', 120, 7), ('Pecans', 180, 7), ('Macadamia nuts', 180, 7), ('Brazil nuts', 180, 7), ('Cottage cheese', 7, 2), ('Sour cream', 7, 2), ('Goat cheese', 14, 2), ('Ricotta cheese', 14, 2), ('Provolone', 14, 2), ('Ground turkey', 2, 3), ('Duck', 2, 3), ('Lamb chops', 3, 3), ('Bison', 3, 3), ('Tilapia', 2, 4), ('Cod', 2, 4), ('Sardines', 2, 4), ('Halibut', 2, 4), ('Crackers', 90, 5), ('Peanut butter', 365, 7), ('Jelly', 365, 6), ('Mayonnaise', 90, 5), ('Ketchup', 365, 5), ('Mustard', 365, 5), ('Hot sauce', 365, 5), ('Soy sauce', 1095, 5), ('Worcestershire sauce', 730, 5), ('Barbecue sauce', 365, 5), ('Maple syrup', 365, 5), ('Baking powder', 365, 5), ('Baking soda', 365, 5), ('Vanilla extract', 730, 5), ('Cinnamon', 730, 5), ('Nutmeg', 365, 5), ('Cumin', 365, 5), ('Paprika', 365, 5), ('Black pepper', 365, 5), ('Garlic powder', 365, 5), ('Onion powder', 365, 5), ('Dried oregano', 365, 5), ('Dried basil', 365, 5), ('Dried thyme', 365, 5), ('Dried rosemary', 365, 5), ('Dried parsley', 365, 5), ('Dried bay leaves', 365, 5), ('Chicken stock', 730, 5), ('Beef stock', 730, 5), ('Vegetable stock', 730, 5), ('Fish stock', 730, 5), ('Coconut milk', 365, 5), ('Canned corn', 1095, 5), ('Canned peas', 1095, 5), ('Canned carrots', 1095, 5), ('Canned mushrooms', 1095, 5), ('Canned tuna', 1095, 4), ('Canned salmon', 1095, 4), ('Canned sardines', 1095, 4), ('Canned olives', 1095, 5), ('Dried beans', 365, 5), ('Dried lentils', 365, 5), ('Dried chickpeas', 365, 5), ('Dried split peas', 365, 5), ('Hummus', 7, 5), ('Pita bread', 7, 5), ('Tortillas', 7, 5), ('Salsa', 7, 5), ('Guacamole', 3, 6), ('Cilantro', 7, 1), ('Mint', 7, 1), ('Basil', 7, 1), ('Parsley', 7, 1), ('Rosemary', 7, 1), ('Thyme', 7, 1), ('Oregano', 7, 1), ('Cumin seeds', 365, 7), ('Coriander seeds', 365, 7), ('Turmeric', 365, 5), ('Ginger', 30, 5), ('Cardamom', 365, 5), ('Cloves', 365, 5), ('Bay leaves', 365, 5), ('Star anise', 365, 5), ('Vanilla beans', 365, 5), ('Dill pickles', 365, 5), ('Gherkins', 365, 5), ('Sauerkraut', 365, 5), ('Kimchi', 365, 5), ('Artichokes', 7, 1), ('Asparagus', 3, 1), ('Eggplant', 7, 1), ('Zucchini', 5, 1), ('Radishes', 7, 1), ('Beets', 14, 1), ('Squash', 7, 1), ('Pumpkin', 30, 1), ('Cantaloupe', 7, 6), ('Honeydew melon', 7, 6), ('Kiwi', 7, 6), ('Clementines', 7, 6), ('Nectarines', 3, 6), ('Apricots', 3, 6), ('Pears', 7, 6), ('Raisins', 365, 6), ('Cranberries', 7, 6), ('Dates', 365, 6), ('Prunes', 365, 6), ('Coconut flakes', 180, 7), ('Coconut oil', 365, 5), ('Tofu', 7, 5), ('Tempeh', 7, 5), ('Seitan', 7, 5), ('Miso paste', 730, 5), ('Soy milk', 7, 5), ('Almond milk', 7, 5), ('Cashew milk', 7, 5), ('Rice milk', 7, 5), ('Quinoa flakes', 365, 5), ('Nutritional yeast', 365, 5);
                `;
    try{
        const {rows} = await pool.query(query)
        res.send({rows})
    } catch (e) {
        console.log("insert error")
    }
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
}

const insertRecipe = () => {
    // const client = new Client(conString);

    client.connect(err => {
        if(err) throw err;
        else {
            //TRUNCATE TABLE "Recipes" RESTART IDENTITY;
            const query = `
                INSERT INTO "Recipes" ("labelName")
                VALUES ('Taiwanese'),
                       ('Japanese'),
                       ('Korean'),
                       ('French'),
                       ('American'),
                       ('Thai'),
                       ('Indian');
            `;
            client
                .query(query)
                .then(() => {
                    console.log('label insert successfully!');
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

export {
    insertCategory,
    insertIngredient,
    insertLabel,
    insertRecipe,
    updataUserLike
}
