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

// export { qeuryByID, qeuryByName, queryByLabel }
export { qeuryByID }