const mongoose = require('mongoose')
const {planoSchema} = require('./Plano')

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
    plano: planoSchema
})

const pessoaModel = mongoose.model('pessoa', pessoaSchema)

module.exports = pessoaModel