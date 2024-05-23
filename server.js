// Importa e configura as variáveis de ambiente do arquivo .env
require('dotenv').config({path: './config/.env'})

// Importa o Express para construir a aplicação web
const express = require('express')
// Cria uma instância do Express
const app = express()
// Importa a função de conexão com o banco de dados
const conexao = require('./db/conexao')

// Importa o middleware CORS para permitir solicitações de diferentes origens
const cors = require('cors')
app.use(cors())

// Configura o aplicativo Express para lidar com dados de formulário URL-encoded
app.use(express.urlencoded({extended: true}))
app.use(express.json())

// Importa as rotas da aplicação
const rotas = require('./routes/rotas')
app.use('/api', rotas)

// Estabelece a conexão com o banco de dados MongoDB
conexao()

// Inicia o servidor na porta 3000 e exibe uma mensagem no console quando estiver rodando
app.listen(3000, () => console.log('START 3000 server.js'))