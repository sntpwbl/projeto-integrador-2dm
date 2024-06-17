// Importa a biblioteca mongoose para interagir com o MongoDB
const mongoose = require('mongoose')

// Define o esquema da coleção "Pessoa" no banco de dados MongoDB
const pessoaSchema = mongoose.Schema({
    nome: {type: String, required: true},
    sobrenome: {type: String, required: true},
    email:  {type: String, required: true, unique: true},
    senha:  {type: String, required: true},
    telefone: String,
    endereco: {
        estado: String,
        cidade: String
    }, 
    plano: {
        nome: String,
        mensalidade: Number,
        beneficios: []
    }
})

// Cria um modelo baseado no esquema definido acima, associado à coleção "Pessoa"
const pessoaModel = mongoose.model('pessoa', pessoaSchema)

module.exports = pessoaModel