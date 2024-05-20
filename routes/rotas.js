const router = require('express').Router()

const planoRotas = require('./planoRotas')
// const usuarioRotas = require('./usuarioRotas')

router.use('/planos', planoRotas)
// router.use('/usuarios', usuarioRotas)

module.exports = router