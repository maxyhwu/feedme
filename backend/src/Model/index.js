//importing modules
import { Sequelize, DataTypes } from 'sequelize'
import dotenv from "dotenv-defaults";
dotenv.config();

    // const sequelize = new Sequelize(`postgres://${process.env.user}:${process.env.password}@127.0.0.1:${process.env.dbport}/${process.env.databaseName}`, {dialect: process.env.database})
    const sequelize = new Sequelize(process.env.url, {dialect: process.env.database})
    //checking if connection is done
        sequelize.authenticate().then(() => {
            console.log(`Database connected to discover`)
        }).catch((err) => {
            console.log(err)
        })

        const db = {}
        db.Sequelize = Sequelize
        db.sequelize = sequelize

    //connecting to model
    db.users = require('./usersModel').default (sequelize, DataTypes);
    db.recipe = require('./recipesModel').default (sequelize, DataTypes);
    db.categories = require('./categoriesModel') (sequelize, DataTypes);
    db.ingredients = require('./ingredientsModel').default (sequelize, DataTypes);
    db.labels = require('./labelsModel') (sequelize, DataTypes);
    db.users.hasMany(db.recipe, {foreignKey: "userID", targetKey: "id", onDelete: 'cascade'})
    db.categories.hasMany(db.ingredients,{foreignKey: "categoryID", targetKey: "id", onDelete: 'cascade'})

//exporting the module
export default db
//new Sequelize(`postgres://${process.env.user}:${process.env.password}@127.0.0.1:${process.env.dbport}/${process.env.databaseName}`, {dialect: process.env.database})
