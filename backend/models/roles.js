'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Roles extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsToMany(models.User, {
        through: models.Rol_Asignado,// ponerlo models.Rol
        as: 'usuarios',
        foreignKey: 'id_rol'
      })
    }
  }
  Roles.init({
    nombre: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Roles',
    tableName: 'roles',
  });
  return Roles;
};