const { DataTypes } = require('sequelize');
const sequelize = require('./Banco');
const Equipamento = require('./Equipamento');

const Aluguel = sequelize.define('Aluguel', {

    cliente: {
        type: DataTypes.STRING,
        allowNull: false
    },

    dataRetirada: {
        type: DataTypes.DATE,
        allowNull: false
    },

    dataDevolucao: {
        type: DataTypes.DATE,
        allowNull: false
    },

    totalHoras: {
        type: DataTypes.FLOAT
    },

    valorTotal: {
        type: DataTypes.FLOAT
    }

});

Equipamento.hasMany(Aluguel, {
    foreignKey: 'EquipamentoId'
});

Aluguel.belongsTo(Equipamento, {
    foreignKey: 'EquipamentoId'
});

module.exports = Aluguel;