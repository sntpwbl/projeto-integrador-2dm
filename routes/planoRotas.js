const router = require('express').Router()
const planoController = require('../controller/planoController')

router.get('/', (_, res) => planoController.lerTodosPlanos(_, res))

router.post('/', (req, res) => planoController.inserirNovoPlano(req, res))

router.put('/:id', (req, res) => planoController.updatePlano(req,res))

router.delete('/:id', (req, res) => planoController.deletePlano(req, res))

module.exports = router