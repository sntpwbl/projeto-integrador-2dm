const router = require('express').Router()

const planoRotas = require('./planoRotas')
const pessoaRotas = require('./pessoaRotas')

router.use('/planos', planoRotas)
router.use('/pessoas', pessoaRotas)

module.exports = router