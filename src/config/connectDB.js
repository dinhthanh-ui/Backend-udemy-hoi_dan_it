import Sequelize from "sequelize";
require("dotenv").config();

/**
 * @param {*} user options 3 of the sequelize
 */

const sequelize = new Sequelize(process.env.DB_DATABASE, 'root', process.env.DB_PASS, {
    host: 'localhost',
    dialect: 'mysql',
    logging: false
});
const connectDB = async() => {
    try {
        await sequelize.authenticate();
        console.log('Connect Database successfully !!! ');
    } catch (error) {
        console.error('Connect Database Unsuccessfully !!!:', error);
    }
};
export default connectDB