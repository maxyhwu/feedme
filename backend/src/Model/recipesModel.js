export default (sequelize, DataTypes) => {
    const Recipes = sequelize.define('Recipes',{
        title: {
            type:DataTypes.STRING,
            allowNull: false,
        },
        overview:{
            type:DataTypes.STRING,
        },
        servingSize: {
            type: DataTypes.INTEGER,
            defaultValue: 1,
            allowNull: false,
        },
        instructions:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        image:{
            type: DataTypes.STRING,
            defaultValue: '',
            allowNull: false,
        },
        video:{
            type: DataTypes.STRING,
            defaultValue: '',
            allowNull: false,
        },
        likeCount:{
            type: DataTypes.INTEGER,
            defaultValue: 0,
            allowNull: false,
        },
        labels:{
            type: DataTypes.ARRAY(DataTypes.INTEGER),
        },
        ingredients:{
            type: DataTypes.JSON,
        },
        comments:{
            type: DataTypes.JSON,
            defaultValue: {}
        }
    }, {timestamps: true})
    return Recipes
}