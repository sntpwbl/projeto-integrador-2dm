const Pessoa = require('../model/Pessoa')
const Plano = require('../model/Plano').planoModel

exports.lerTodosPlanos = async(_, res)=>{
    try {
        const planos = await Plano.find()
        res.status(200).json(planos)
    } catch (err) {
        res.status(500).json({message: err.message})
    }
}

exports.inserirNovoPlano = async(req, res)=>{
    try {
        const novoPlano = {
            mensalidade: req.body.mensalidade,
            redes_de_academia: req.body.redes_de_academia,
            descricao: {
                modalidade:       req.body.modalidade,
                avaliacao_fisica: req.body.avaliacao_fisica,
                nutricionista:    req.body.nutricionista,
                personal_trainer: req.body.personal_trainer,
                produtos_Growth:  req.body.produtos_Growth
            }
        }
        await Plano.create(novoPlano)
        res.status(201).json({message: 'Plano criado com sucesso.', result: novoPlano})
    } catch (err) {
        res.status(500).json({message: err.message})
    }
}