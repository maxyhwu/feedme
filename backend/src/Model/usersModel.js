//user model
export default (sequelize, DataTypes) => {
    const Users = sequelize.define('Users',{
        userName: {
            type:DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        email: {
            type:DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        password:{
            type: DataTypes.STRING,
        },
        provider: {
            type: DataTypes.STRING,
            defaultValue: 'local'
        },
        favorite:{
            type: DataTypes.ARRAY(DataTypes.STRING)
        },
        notiRec:{
            type: DataTypes.BOOLEAN,
            defaultValue: true,
            allowNull: false,
        },
        notiIngre:{
            type: DataTypes.BOOLEAN,
            defaultValue: true,
            allowNull: false,
        },
        like:{
            type: DataTypes.ARRAY(DataTypes.INTEGER)
        },
        fridge:{
            type: DataTypes.JSON,
            defaultValue: {}
        }
    }, {timestamps: true})
    return Users
}