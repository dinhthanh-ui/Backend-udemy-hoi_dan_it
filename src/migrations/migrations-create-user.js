'use strict';
module.exports = {
    async up (queryInterface, Sequelize)
    {
        await queryInterface.createTable('User', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            email: {
                type: Sequelize.STRING
            },
            password: {
                type: Sequelize.STRING
            },
            userName: {
                type: Sequelize.STRING
            },
            address: {
                type: Sequelize.STRING
            },
            phone: {
                type: Sequelize.STRING
            },
            sex: {
                type: Sequelize.STRING
            },
            GroupId: {
                type: Sequelize.INTEGER,
            },
            fullName: {
                type: Sequelize.STRING,
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },
    async down (queryInterface, Sequelize)
    {
        await queryInterface.dropTable('User');
    }
};