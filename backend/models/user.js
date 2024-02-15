'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {

      this.belongsToMany(models.Tarea, {
        through: models.Tarea_Asignada,
        as: 'tareas_Usuario',
        foreignKey: 'id_usuario'
      });
      
      this.belongsToMany(models.Roles, {
        through: models.Rol_Asignado,
        foreignKey: 'id_usuario'
      })
    }
  }

  User.init({
    nombre: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      unique: true
    },
    password: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
    tableName: 'users'
  });

  return User;

};
