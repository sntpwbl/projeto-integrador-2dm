// Importa o módulo Router do Express para definir rotas
const router = require('express').Router()
// Importa o controlador de pessoa para lidar com as requisições
const pessoaController = require('../controller/pessoaControler')

// Importa o controlador de pessoa para lidar com as requisições
router.get('/user/',    (_, res) => pessoaController.lerTodasPessoas  (_, res))

router.get('/user/:id', pessoaController.middlewareVerificarToken, (req, res) => pessoaController.lerPessoaId      (req, res))

router.post('/user/cadastrar',   (req, res) => pessoaController.inserirNovaPessoa(req, res))

router.post('/user/login', (req, res) => pessoaController.realizarLogin(req, res))

router.put('/user/:id', pessoaController.middlewareVerificarToken, (req, res)  => pessoaController.atualizarPessoa  (req, res))

router.delete('/user/:id', pessoaController.middlewareVerificarToken, (req, res) => pessoaController.deletarPessoa    (req, res))

module.exports = router
