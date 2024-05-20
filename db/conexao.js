require('dotenv').config({path: './config/.env'})
const mongoose = require('mongoose')

const conexao = async() =>{
    try {
        await mongoose.connect(process.env.MONGODB_STRING)
        .then(() => console.log('Banco conectado'))
    } catch (err) {
        console.log(err)
    }
}

module.exports = conexao