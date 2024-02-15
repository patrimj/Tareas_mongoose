'use strict';
const { genTareasAsignadas } = require('../factories/tarea_asignada.factory');

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
   const tareaAsig = await genTareasAsignadas(4);
    await queryInterface.bulkInsert('tarea_asignadas', tareaAsig, {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('tarea_asignadas', null, {});
  }
};
