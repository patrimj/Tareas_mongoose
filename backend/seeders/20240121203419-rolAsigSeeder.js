'use strict';
const { genRolesAsignados } = require('../factories/rol_asignado.factory');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   const rolAsig = await genRolesAsignados(4);
    await queryInterface.bulkInsert('rol_asignados', rolAsig, {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('rol_asignados', null, {});
  }

};
