const mongoose = require('mongoose')


const pessoaSchema = mongoose.Schema({
    nome: {type: String, required: true},
    sobrenome: {type: String, required: true},
    email:  {type: String, required: true, unique: true},
    senha:  {type: String, required: true},
    telefone: String,
    bio: String,
    endereco: {
        pais: String,
        estado: String,
        cidade: String,
        cep: String
    }, 
    plano: {
        mensalidade: Number,
        redes_de_academia: String,
        descricao: {
            modalidade:       String,
            avaliacao_fisica: String,
            nutricionista:    String,
            personal_trainer: String,
            produtos_Growth:  String
        }
    }
})

const pessoaModel = mongoose.model('pessoa', pessoaSchema)

module.exports = pessoaModel