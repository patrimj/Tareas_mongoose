'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Tarea_Asignada extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Tarea, {
        foreignKey: 'id_tarea',
        as: 'tarea'
      });

      this.belongsTo(models.User, {
        foreignKey: 'id_usuario',
        as: 'users'
      });
    }
  }
  Tarea_Asignada.init({
    id_tarea: DataTypes.INTEGER,
    id_usuario: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Tarea_Asignada',
    tableName: 'tarea_asignadas',
  });
  return Tarea_Asignada;
};