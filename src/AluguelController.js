const Aluguel = require('./Aluguel');
const Equipamento = require('./Equipamento');

module.exports = {
    async criar(req, res) {
        try {
            const { cliente, dataRetirada, dataDevolucao, EquipamentoId } = req.body;

            const equipamento = await Equipamento.findByPk(EquipamentoId);

            if (!equipamento) {
                return res.status(404).json({ erro: 'Equipamento não encontrado' });
            }

            const retirada = new Date(dataRetirada);
            const devolucao = new Date(dataDevolucao);

            const totalHoras = (devolucao - retirada) / (1000 * 60 * 60);

            if (totalHoras <= 0) {
                return res.status(400).json({ erro: 'A data de devolução deve ser maior que a data de retirada' });
            }

            const valorTotal = totalHoras * equipamento.valorHora;

            const aluguel = await Aluguel.create({
                cliente,
                dataRetirada,
                dataDevolucao,
                totalHoras,
                valorTotal,
                EquipamentoId
            });

            res.status(201).json(aluguel);
        } catch (error) {
            res.status(400).json({ erro: error.message });
        }
    },

    async listar(req, res) {
        const alugueis = await Aluguel.findAll({
            include: Equipamento
        });

        res.json(alugueis);
    },

    async buscarPorId(req, res) {
        const aluguel = await Aluguel.findByPk(req.params.id, {
            include: Equipamento
        });

        if (!aluguel) {
            return res.status(404).json({ erro: 'Aluguel não encontrado' });
        }

        res.json(aluguel);
    },

    async atualizar(req, res) {
        try {
            const aluguel = await Aluguel.findByPk(req.params.id);

            if (!aluguel) {
                return res.status(404).json({ erro: 'Aluguel não encontrado' });
            }

            const { cliente, dataRetirada, dataDevolucao, EquipamentoId } = req.body;

            const equipamento = await Equipamento.findByPk(EquipamentoId);

            if (!equipamento) {
                return res.status(404).json({ erro: 'Equipamento não encontrado' });
            }

            const retirada = new Date(dataRetirada);
            const devolucao = new Date(dataDevolucao);

            const totalHoras = (devolucao - retirada) / (1000 * 60 * 60);

            if (totalHoras <= 0) {
                return res.status(400).json({ erro: 'A data de devolução deve ser maior que a data de retirada' });
            }

            const valorTotal = totalHoras * equipamento.valorHora;

            await aluguel.update({
                cliente,
                dataRetirada,
                dataDevolucao,
                totalHoras,
                valorTotal,
                EquipamentoId
            });

            res.json(aluguel);
        } catch (error) {
            res.status(400).json({ erro: error.message });
        }
    },

    async deletar(req, res) {
        const aluguel = await Aluguel.findByPk(req.params.id);

        if (!aluguel) {
            return res.status(404).json({ erro: 'Aluguel não encontrado' });
        }

        await aluguel.destroy();
        res.json({ mensagem: 'Aluguel deletado com sucesso' });
    }
};