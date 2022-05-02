'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) =>
{
    class User extends Model
    {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate (models)
        {
            // define association here
            User.belongsTo(models.Group, { foreignKey: 'GroupId' });
        }
    }
    User.init({
        email: DataTypes.STRING,
        password: DataTypes.STRING,
        userName: DataTypes.STRING,
        address: DataTypes.STRING,
        phone: DataTypes.STRING,
        sex: DataTypes.STRING,
        GroupId: DataTypes.INTEGER,
        fullName: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'User',
    });
    return User;
};