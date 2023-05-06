//user model
export default (sequelize, DataTypes) => {
    const Users = sequelize.define('Users',{
        userName: {
            type:DataTypes.STRING,
            allowNull: false,
            // unique: true,
        },
        email: {
            type:DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        password:{
            type: DataTypes.STRING,
        },
        photo:{
            type: DataTypes.STRING,
            defaultValue: "",
            allowNull: false
        },
        photoPID:{
            type: DataTypes.INTEGER,
            defaultValue: -1,
            allowNull: false
        },
        secretKey:{
            type: DataTypes.JSON,
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
    return Users
}