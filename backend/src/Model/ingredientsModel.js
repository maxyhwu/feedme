module.exports = (sequelize, DataTypes) => {
    const Ingredients = sequelize.define('Ingredients',{
        ingredName: {
            type:DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        expPeriod:{
            type: DataTypes.DATE,
        },
        provider: {
            type: DataTypes.STRING,
            defaultValue: 'local'
        },
    }, {timestamps: true})
    return Ingredients
}