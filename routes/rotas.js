const router = require('express').Router()
const pessoaRotas = require('./pessoaRotas')

router.use('/users', pessoaRotas)

module.exports = router