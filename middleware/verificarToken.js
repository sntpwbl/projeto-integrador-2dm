// Importa a biblioteca jwt para lidar com tokens de autenticação
const jwt = require("jsonwebtoken")

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
      next()
    } catch (err) {
      // Em caso de erro, retorna um status 400 (Bad Request) com uma mensagem de erro
      res.status(400).json({ message: "Acesso negado." })
    }
  }
  
module.exports = verificarToken