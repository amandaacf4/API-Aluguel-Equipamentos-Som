const { DataTypes } = require('sequelize');
const sequelize = require('./Banco');

const Equipamento = sequelize.define('Equipamento', {
    nome: {
        type: DataTypes.STRING,
        allowNull: false
    },

    descricao: {
        type: DataTypes.STRING
    },

    valorHora: {
        type: DataTypes.FLOAT,
        allowNull: false
    }
});

module.exports = Equipamento;