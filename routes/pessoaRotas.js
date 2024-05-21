const router = require('express').Router()
const pessoaController = require('../controller/pessoaControler')

router.get('/',    (req, res) => pessoaController.lerTodasPessoas  (req, res))

router.get('/:id', (req, res) => pessoaController.lerPessoaId      (req, res))

router.post('/',   (req, res) => pessoaController.inserirNovaPessoa(req, res))

router.put('/:id',   (req, res)  => pessoaController.atualizarPessoa  (req, res))

router.delete('/:id', (req, res) => pessoaController.deletarPessoa    (req, res))

module.exports = router
