'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Rol_Asignado extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      this.belongsTo(models.Roles, {
        foreignKey: 'id_rol',
        as: 'roles'
      }),

        this.belongsTo(models.User, {
          foreignKey: 'id_usuario',
          as: 'users'
        })
    }
  }

  Rol_Asignado.init({
    id_rol: DataTypes.INTEGER,
    id_usuario: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Rol_Asignado',
    tableName: 'rol_asignados',
  });
  return Rol_Asignado;
};