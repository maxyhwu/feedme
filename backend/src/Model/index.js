//importing modules
const {Sequelize, DataTypes} = require('sequelize')
require('dotenv').config()

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
    db.users = require('./usersModel') (sequelize, DataTypes)
    db.recipe = require('./recipesModel') (sequelize, DataTypes)
    db.categories = require('./categoriesModel') (sequelize, DataTypes)
    db.ingredients = require('./ingredientsModel') (sequelize, DataTypes)
    db.labels = require('./labelsModel') (sequelize, DataTypes)
    db.users.hasMany(db.recipe, {foreignKey: "userID", targetKey: "id", onDelete: 'cascade'})


//exporting the module
module.exports = db 
//new Sequelize(`postgres://${process.env.user}:${process.env.password}@127.0.0.1:${process.env.dbport}/${process.env.databaseName}`, {dialect: process.env.database})