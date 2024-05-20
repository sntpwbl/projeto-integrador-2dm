const Pessoa = require('../model/Pessoa')
const Plano = require('../model/Plano').planoModel

exports.lerTodasPessoas = async (req, res)  =>{
    try{
        const pessoas = await Pessoa.find()
        res.status(200).json(pessoas)
    }catch(erro){
        res.status(500).json({message: "Erro ao encontrar clientes"})
    }

}

exports.lerPessoaId = async (req , res) =>{
    try{
        const pessoa = await pessoa.findById(req.params.id)
        res.status(200).json(pessoa)
    }catch(erro){
        res.status(500).json({message: "Erro ao encontrar cliente"})
    }
}

exports.inserirNovaPessoa = async (req, res) =>{
    try{
        const novaPessoa = {
            nome: req.body.nome,
            email: req.body.email,
            telefone: req.body.telefone,
            endereco: {
                rua: req.body.rua,
                numero: req.body.numero,
                bairro: req.body.bairro,
                estado: req.body.estado,
                cidade: req.body.cidade,
                cep: req.body.cep
            },
            plano: {
                mensalidade: req.body.mensalidade,
                redes_de_academia: req.body.redes_de_academia,
                descricao: req.body.descricao
            }

        }
        await Pessoa.create(novaPessoa)
        res.status(201).json({message: "Cliente inserido com sucesso", result: novaPessoa})
    }catch(erro){
        res.status(500).json({message: "Erro ao inserir cliente"})
    }

}

