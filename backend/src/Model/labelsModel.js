module.exports = (sequelize, DataTypes) => {
    const Labels = sequelize.define('Labels',{
        labelName: {
            type:DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
    }, {timestamps: true})
    return Labels
}