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
            type: DataTypes.ARRAY(DataTypes.STRING),
            allowNull: false,
        },
        image:{
            type: DataTypes.STRING,
            defaultValue: '',
            allowNull: false,
        },
        imagePID:{
            type: DataTypes.STRING,
            defaultValue: '',
            allowNull: false
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
            type: DataTypes.ARRAY(DataTypes.JSON),
        },
        createdAt: {
            type: DataTypes.DATE,
            defaultValue: sequelize.literal('NOW()')
        },
        updatedAt: {
            type: DataTypes.DATE,
            defaultValue: sequelize.literal('NOW()')
        }
    }, {timestamps: true, paranoid: true})
    return Recipes
}