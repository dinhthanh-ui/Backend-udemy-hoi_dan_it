'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {
        return queryInterface.bulkInsert('Group_Role', [{
                GroupId: '1',
                RoleId: '2',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                GroupId: '2',
                RoleId: '3',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                GroupId: '1',
                RoleId: '2',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                GroupId: '2',
                RoleId: '1',
                createdAt: new Date(),
                updatedAt: new Date()
            }
        ]);
    },

    async down(queryInterface, Sequelize) {
        return queryInterface.bulkDelete('Group_Role', null, {})
    }
};