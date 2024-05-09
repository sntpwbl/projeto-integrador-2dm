//usar npm start para rodar c/ nodemon

//configuração do ambiente, importando o arquivo .env, módulos express, mongoose e cors
require('dotenv').config({path: './config/.env'})

const express = require('express')
const app = express()

const mongoose = require('mongoose')

const cors = require('cors')
app.use(cors())

//configuração dos middlewares
app.use(express.urlencoded({extended: true}))
app.use(express.json())

//teste home
app.get('/', (_, res) => res.send('teste'))

mongoose.connect(process.env.MONGODB_STRING)
.then(() => app.listen(3000, () => console.log('App rodando na porta 3000')))
.catch((err) => console.log(err))
