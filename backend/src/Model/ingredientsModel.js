const {INTEGER} = require("sequelize")

module.exports = (sequelize, DataTypes) => {
    const Ingredients = sequelize.define('Ingredients',{
        ingredName: {
            type:DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        expPeriod: {
            type: DataTypes.INTEGER,
        },
    }, {timestamps: false})
    return Ingredients
}
