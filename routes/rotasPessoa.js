// Importa o módulo Router do Express para definir rotas
const router = require('express').Router()
// Importa o controlador de pessoa para lidar com as requisições
const pessoaController = require('../controller/pessoaControler')
// Importa middleware responsável pela verificação do token
const verificarToken = require('../middleware/verificarToken')

//Responsável por retornar as informações do usuário a partir do ID, verificando se seu token é válido
router.get('/:id', verificarToken, (req, res) => pessoaController.lerPessoaId(req, res))

//Responsável por atualizar as informações do usuário a partir do ID, verificando se seu token é válido
router.put('/:id', verificarToken, (req, res) => pessoaController.atualizarPessoa(req, res))

//Responsável por excluir o usuário do banco a partir do ID, verificando se seu token é válido
router.delete('/:id', verificarToken, (req, res) => pessoaController.deletarPessoa(req, res))

module.exports = router