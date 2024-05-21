const Pessoa = require('../model/Pessoa')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

exports.lerTodasPessoas = async (_, res)  =>{
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
        if(!pessoa) res.status(404).json({message: 'Usuário não foi encontrado.'})
        res.status(200).json(pessoa)
    }catch(erro){
        res.status(500).json({message: "Erro ao encontrar cliente"})
    }
}

exports.inserirNovaPessoa = async (req, res) =>{
    try{

        const hashSenha = await bcrypt.hash(req.body.senha, 10)
        
        const novaPessoa = {
            nome: req.body.nome,
            sobrenome: req.body.sobrenome,
            email: req.body.email,
            senha: hashSenha,
            telefone: req.body.telefone,
            bio: req.body.bio,
            endereco: req.body.endereco,
            plano: req.body.plano
        }

        if(!novaPessoa.nome || !novaPessoa.sobrenome || !novaPessoa.email || !novaPessoa.senha) return res.status(422).json({message: 'Está faltando um campo obrigatorio'})
        
        await Pessoa.create(novaPessoa)
        res.status(201).json({message: "Cliente inserido com sucesso", result: novaPessoa})
    }catch(erro){
        res.status(500).json({message: erro.message})
    }

}

exports.atualizarPessoa = async(req, res) =>{
    try {
        const pessoaAtualizada = await Pessoa.findByIdAndUpdate(req.params.id, req.body)

        if(!pessoaAtualizada) res.status(404).json({message: 'Usuário não foi encontrado.'})
        res.status(200).json({message: 'Usuário atualizada com sucesso.', result: pessoaAtualizada})
    } catch (err) {
        res.status(500).json({message: message.err})
    }
}

exports.deletarPessoa = async(req, res) =>{
    try {
        const pessoaDeletada = await Pessoa.findByIdAndDelete(req.params.id)

        if(!pessoaDeletada) res.status(404).json({message: 'Usuário não foi encontrado.'})
        res.status(200).json({message: 'Usuário deletado com sucesso.', result: pessoaDeletada})
    } catch (err) {
        res.status(500).json({message: err.message})
    }
}

exports.realizarLogin = async(req, res)=>{
    try {
        const usuario = await Pessoa.findOne({email: req.body.email})

        if(!usuario) return res.status(401).json({statusCode: 401, message: "Email não foi cadastrado."})
        
        const senhaValida = await bcrypt.compare(req.body.senha, usuario.senha)
        
        if(!senhaValida) return res.status(401).json({statusCode: 401, message: 'Senha não corresponde ao email digitado.'})

        const token = jwt.sign({email: usuario.email}, process.env.SECRET)
        res.status(200).json({message: 'Login realizado com sucesso.', data:{token}})
        
    } catch (err) {
       res.status(500).json({message: err.message}) 
    }
}