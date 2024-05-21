const router = require('express').Router()

const planoRotas = require('./planoRotas')
const pessoaRotas = require('./pessoaRotas')

router.use('/planos', planoRotas)
router.use('/users', pessoaRotas)

module.exports = router