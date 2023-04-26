const pg = require('pg');
require('dotenv').config()
var conString = process.env.url;

function insertCategory() {
    const client = new pg.Client(conString);

    client.connect(err => {
        if (err) throw err;
        else {
            const query = `
            INSERT INTO "Categories" ("cateName") VALUES ('apple');
            `;

            client
                .query(query)
                .then(() => {
                    console.log('category insert successfully!');
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

function insertIngredient() {
    const client = new pg.Client(conString);

    client.connect(err => {
        if (err) throw err;
        else {
            const query = `
            INSERT INTO "Ingredients" ("ingredName", "expPeriod") VALUES ('milk', '2023-04-24');
            `;

            client
                .query(query)
                .then(() => {
                    console.log('ingredients insert successfully!');
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

module.exports = {
    insertCategory,
    insertIngredient
}