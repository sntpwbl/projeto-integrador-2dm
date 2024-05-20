const Pessoa = require('../model/Pessoa')


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
            plano: req.body.plano

        }
        await Pessoa.create(novaPessoa)
        res.status(201).json({message: "Cliente inserido com sucesso", result: novaPessoa})
    }catch(erro){
        res.status(500).json({message: "Erro ao inserir cliente"})
    }

}

exports.atualizarPessoa = async(req, res) =>{
    try {
        const pessoaAtualizada = req.body
        await Pessoa.findByIdAndUpdate(req.params.id, pessoaAtualizada)
        res.status(200).json({message: 'Usuário atualizada com sucesso.', result: pessoaAtualizada})
    } catch (err) {
        res.status(500).json({message: message.err})
    }
}

exports.deletarPessoa = async(req, res) =>{
    try {
        const pessoaDeletada = await Pessoa.findByIdAndDelete(req.params.id)
        res.status(200).json({message: 'Usuário deletado com sucesso.', result: pessoaDeletada})
    } catch (err) {
        res.status(500).json({message: message.err})
    }
}