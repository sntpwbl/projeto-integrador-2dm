const router = require('express').Router()
const pessoaController = require('../controller/pessoaControler')

router.get('/',    (_, res) => pessoaController.lerTodasPessoas  (_, res))

router.get('/:id', pessoaController.middlewareVerificarToken, (req, res) => pessoaController.lerPessoaId      (req, res))

router.post('/cadastrar',   (req, res) => pessoaController.inserirNovaPessoa(req, res))

router.post('/login', (req, res) => pessoaController.realizarLogin(req, res))

router.put('/:id', pessoaController.middlewareVerificarToken, (req, res)  => pessoaController.atualizarPessoa  (req, res))

router.delete('/:id', pessoaController.middlewareVerificarToken, (req, res) => pessoaController.deletarPessoa    (req, res))

module.exports = router
