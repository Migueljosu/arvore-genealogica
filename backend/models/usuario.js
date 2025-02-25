"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Usuario extends Model {
    static associate(models) {
      // Um usuário pertence a uma pessoa específica da família
      Usuario.belongsTo(models.Pessoa, {
        foreignKey: "id_pessoa",
        as: "pessoa",
      });
    }
  }

  Usuario.init(
    {
      email: DataTypes.STRING,
      senha: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Usuario",
    }
  );

  return Usuario;
};
