'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Products', [
      {
        name: '',
        price: 10,
        vendor_code: '',
        description: '',
        category: 'Toys',
        subcategory: 'Toys',
        images: '/uploads/',
        color: '',
        size: 'S',
        evaluation: 5,
        in_stock: 16,
        hit: true,
        new: false,
        sale: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      // npx sequelize-cli db:seed:all записать в БД новые строки
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Products', null, {});
  },
};
