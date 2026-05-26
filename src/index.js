const express = require('express');
const cors = require('cors');
const sequelize = require('./Banco');

const EquipamentoController = require('./EquipamentoController');
const AluguelController = require('./AluguelController');

require('./Equipamento');
require('./Aluguel');

const app = express();

app.use(cors());
app.use(express.json());

app.post('/equipamentos', EquipamentoController.criar);
app.get('/equipamentos', EquipamentoController.listar);
app.get('/equipamentos/:id', EquipamentoController.buscarPorId);
app.put('/equipamentos/:id', EquipamentoController.atualizar);
app.delete('/equipamentos/:id', EquipamentoController.deletar);

app.post('/alugueis', AluguelController.criar);
app.get('/alugueis', AluguelController.listar);
app.get('/alugueis/:id', AluguelController.buscarPorId);
app.put('/alugueis/:id', AluguelController.atualizar);
app.delete('/alugueis/:id', AluguelController.deletar);

sequelize.sync({ alter: true }).then(() => {
    app.listen(3000, () => {
        console.log('Servidor rodando em http://localhost:3000');
    });
});