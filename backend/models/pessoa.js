"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Pessoa extends Model {
    /**
     * Helper method for defining associations.
     */
    static associate(models) {
      // Relacionamento de pai e mãe (auto-relacionamento)
      Pessoa.belongsTo(models.Pessoa, { as: "pai", foreignKey: "id_pai" });
      Pessoa.belongsTo(models.Pessoa, { as: "mae", foreignKey: "id_mae" });

      // Relacionamento com Casamento_Pessoa
      Pessoa.hasMany(models.Casamento_Pessoa, {
        foreignKey: "id_pessoa",
      });

      // Relacionamento com Usuário
      Pessoa.hasOne(models.Usuario, {
        foreignKey: "id_pessoa",
      });
    }
  }

  Pessoa.init(
    {
      nome: DataTypes.STRING,
      genero: DataTypes.STRING,
      data_nascimento: DataTypes.DATE,
      id_pai: DataTypes.INTEGER,
      id_mae: DataTypes.INTEGER,
      foto_perfil: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Pessoa",
    }
  );

  return Pessoa;
};
