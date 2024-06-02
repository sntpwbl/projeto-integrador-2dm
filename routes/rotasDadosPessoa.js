// Importa o módulo Router do Express para definir rotas
const router = require('express').Router()

// Importa o controlador de dados da pessoa para lidar com as requisições
const dadosController = require('../controller/controllerDadosPessoa')

//Responsável por cadastrar novos usuários
router.post('/cadastrar', (req, res) => dadosController.cadastrarPessoa(req, res))

//Responsável por autenticar os usuários e gerar um token JWT para os mesmos
router.post('/login', (req, res) => dadosController.realizarLogin(req, res))

//Responsável pela alteração da senha do usuário
router.patch('/senha', (req, res) => dadosController.alterarSenha(req, res))

module.exports = router