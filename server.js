//usar npm start para rodar c/ nodemon

//configuração do ambiente, importando o arquivo .env, módulos express, mongoose e cors
require('dotenv').config({path: './config/.env'})

const express = require('express')
const app = express()

const conexao = require('./db/conexao')

const cors = require('cors')
app.use(cors())

//configuração dos middlewares
app.use(express.urlencoded({extended: true}))
app.use(express.json())

const rotas = require('./routes/rotas')
app.use('/api', rotas)

conexao()

//teste home
app.get('/', (_, res) => res.send('teste'))

app.listen(3000, () => console.log('Rodando'))