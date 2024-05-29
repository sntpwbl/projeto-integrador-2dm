// Importa a biblioteca jwt para lidar com tokens de autenticação
const jwt = require("jsonwebtoken")
const {jwtDecode} = require('jwt-decode')

// Middleware para verificar o token de autenticação
const verificarToken = (req, res, next) => {
    // Extrai o token do cabeçalho da requisição
    const header = req.headers["authorization"]
    const token = header && header.split(" ")[1]
    // Verifica se o token existe
    if (!token) return res.status(401).json({ message: "Acesso inválido." })
  
    try {
      // Verifica se o token é válido
      jwt.verify(token, process.env.SECRET)

      // Se o token usado não conter o id passado na url, o acesso será negado
      if(jwtDecode(token).id!=req.params.id) throw new Error('Acesso negado.')

      next()
    } catch (err) {
      // Em caso de erro, retorna um status 400 (Bad Request) com uma mensagem de erro
      if(err.name==='TokenExpiredError') return res.status(400).json({message: 'Token expirado.'})
      res.status(400).json({ message: err.message })
    }
  }
  
module.exports = verificarToken