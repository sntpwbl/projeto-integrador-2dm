const router = require('express').Router()
const pessoaController = require('../controller/pessoaControler')

router.get('/user/',    (_, res) => pessoaController.lerTodasPessoas  (_, res))

router.get('/user/:id', pessoaController.middlewareVerificarToken, (req, res) => pessoaController.lerPessoaId      (req, res))

router.post('/user/cadastrar',   (req, res) => pessoaController.inserirNovaPessoa(req, res))

router.post('/user/login', (req, res) => pessoaController.realizarLogin(req, res))

router.put('/user/:id', pessoaController.middlewareVerificarToken, (req, res)  => pessoaController.atualizarPessoa  (req, res))

router.delete('/user/:id', pessoaController.middlewareVerificarToken, (req, res) => pessoaController.deletarPessoa    (req, res))

module.exports = router
