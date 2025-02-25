"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Casamento_Pessoa extends Model {
    static associate(models) {
      // Cada relação pertence a um casamento
      Casamento_Pessoa.belongsTo(models.Casamento, {
        foreignKey: "id_casamento",
        as: "casamento",
      });

      // Cada pessoa pode estar em vários casamentos
      Casamento_Pessoa.belongsTo(models.Pessoa, {
        foreignKey: "id_pessoa",
        as: "pessoa",
      });
    }
  }

  Casamento_Pessoa.init(
    {
      id_casamento: DataTypes.INTEGER,
      id_pessoa: DataTypes.INTEGER,
      tipo: DataTypes.STRING, // 'marido' ou 'esposa'
    },
    {
      sequelize,
      modelName: "Casamento_Pessoa",
    }
  );

  return Casamento_Pessoa;
};
