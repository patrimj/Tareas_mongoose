'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Tareas', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      descripcion: {
        type: Sequelize.STRING
      },
      dificultad: {
        type: Sequelize.STRING
      },
      horas_previstas: {
        type: Sequelize.INTEGER
      },
      horas_realizadas: {
        type: Sequelize.INTEGER
      },
      porcentaje_realizacion: {
        type: Sequelize.INTEGER
      },
      completada: {
        type: Sequelize.BOOLEAN
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
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Tareas');
  }
};