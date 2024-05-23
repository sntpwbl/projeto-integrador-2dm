// Arquivo centralizador de rotas, funciona a partir de /api/

// Importa o módulo Router do Express para definir rotas
const router = require('express').Router()

// Importa os arquivos que serão responsáveis pelas rotas
const rotasDadosPessoa = require('../routes/rotasDadosPessoa')
const rotasPessoa = require('../routes/rotasPessoa')

// Usa os objetos de rota como middleware para serem responsáveis por suas respectivas rotas
router.use('/user', rotasPessoa)
router.use('/auth', rotasDadosPessoa)

module.exports = router
