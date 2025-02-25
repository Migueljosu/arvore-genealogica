"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Casamento extends Model {
    static associate(models) {
      // Um casamento pode ter várias pessoas (maridos/esposas)
      Casamento.hasMany(models.Casamento_Pessoa, {
        foreignKey: "id_casamento",
        as: "participantes",
      });
    }
  }

  Casamento.init(
    {
      data_casamento: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "Casamento",
    }
  );

  return Casamento;
};
