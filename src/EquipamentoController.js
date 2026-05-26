const Equipamento = require('./Equipamento');

module.exports = {
    async criar(req, res) {
        try {
            const equipamento = await Equipamento.create(req.body);
            res.status(201).json(equipamento);
        } catch (error) {
            res.status(400).json({ erro: error.message });
        }
    },

    async listar(req, res) {
        const equipamentos = await Equipamento.findAll();
        res.json(equipamentos);
    },

    async buscarPorId(req, res) {
        const equipamento = await Equipamento.findByPk(req.params.id);

        if (!equipamento) {
            return res.status(404).json({ erro: 'Equipamento não encontrado' });
        }

        res.json(equipamento);
    },

    async atualizar(req, res) {
        const equipamento = await Equipamento.findByPk(req.params.id);

        if (!equipamento) {
            return res.status(404).json({ erro: 'Equipamento não encontrado' });
        }

        await equipamento.update(req.body);
        res.json(equipamento);
    },

    async deletar(req, res) {
        const equipamento = await Equipamento.findByPk(req.params.id);

        if (!equipamento) {
            return res.status(404).json({ erro: 'Equipamento não encontrado' });
        }

        await equipamento.destroy();
        res.json({ mensagem: 'Equipamento deletado com sucesso' });
    }
};