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
            sobrenome: req.body.sobrenome,
            email: req.body.email,
            senha: req.body.senha,
            telefone: req.body.telefone,
            bio: req.body.bio,
            endereco: req.body.endereco,
            plano: req.body.plano
        }

        if(!novaPessoa.nome || !novaPessoa.sobrenome || !novaPessoa.email || !novaPessoa.senha || !novaPessoa.telefone || !novaPessoa.bio || !novaPessoa.endereco || !novaPessoa.plano) return res.status(422).json({message: 'Está faltando um campo obrigatorio'})
        await Pessoa.create(novaPessoa)
        res.status(201).json({message: "Cliente inserido com sucesso", result: novaPessoa})
    }catch(erro){
        res.status(500).json({message: erro.message})
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