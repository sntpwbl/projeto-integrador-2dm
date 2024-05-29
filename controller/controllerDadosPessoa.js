// Importa o modelo Pessoa para interagir com o banco de dados
const Pessoa = require("../model/Pessoa")
// Importa a biblioteca bcrypt para criptografar senhas
const bcrypt = require("bcrypt")
// Importa a biblioteca jwt para lidar com tokens de autenticação
const jwt = require("jsonwebtoken")

// Função para inserir uma nova pessoa no banco de dados
exports.cadastrarPessoa = async (req, res) => {
    try {
      
      // Verifica se algum campo obrigatório está faltando
      if(!req.body.nome) throw new Error('Campo nome é obrigatório.')
      if(!req.body.sobrenome) throw new Error('Campo sobrenome é obrigatório.')
      if(!req.body.email) throw new Error('Campo email é obrigatório.')
      if(!req.body.senha) throw new Error('Campo senha é obrigatório.')
  
      // Cria um objeto com os dados da nova pessoa
      const novaPessoa = {
        nome: req.body.nome,
        sobrenome: req.body.sobrenome,
        email: req.body.email,
        senha: req.body.senha
      }
  
      // Verifica se a senha e a confirmação de senha coincidem
      if (req.body.senha != req.body.confirma_senha) throw new Error("As senhas não coincidem." )
  
      // Criptografa a senha antes de salvar
      const hashSenha = await bcrypt.hash(novaPessoa.senha, 10)
  
      // Atualiza a senha criptografada
      novaPessoa.senha = hashSenha
  
      // Cria uma nova pessoa no banco de dados
      await Pessoa.create(novaPessoa)

      // Retorna um status 201 (Created) com uma mensagem de sucesso
      res.status(201).json({ resultado: "Pessoa cadastrada com sucesso."})
  
    } catch (erro) {
      // Em caso de erro, retorna um status 422 (Entidade não processável) com uma mensagem de erro
      res.status(422).json({ resultado: erro.message })
    }
  }

// Função para realizar o login de uma pessoa
exports.realizarLogin = async (req, res) => {
    try {
      // Se o usuário não mandou o email ou a senha, um erro é gerado
      if(!req.body.email) throw new Error('Campo email é obrigatório.')
      if(!req.body.senha) throw new Error('Campo senha é obrigatório.')
  
      // Busca o usuário pelo email fornecido
      const usuario = await Pessoa.findOne({ email: req.body.email })
  
      // Verifica se o usuário foi encontrado
      if (!usuario) throw new Error("Email não foi cadastrado.")
        
      // Compara a senha fornecida com a senha armazenada no banco de dados usando bcrypt
      const senhaValida = await bcrypt.compare(req.body.senha, usuario.senha)
  
      // Verifica se a senha é válida
      if (!senhaValida) throw new Error("Senha é inválida.")
  
      // Gera um token de autenticação usando jwt
      const token = jwt.sign({ id: usuario._id }, process.env.SECRET, {expiresIn: '1d'})
  
      // Retorna um status 200 (OK) com o ID do usuário e o token
      res.status(200).json({ token })
  
    } catch (erro) {
      // Se o usuário não enviou o email ou senha, retorna um status 400 (Bad Request) com mensagem
      if(erro.message==='Campo email é obrigatório.'||erro.message==='Campo senha é obrigatório.')
        return res.status(400).json({resultado: erro.message})
      // Caso o token esteja errado, retorna um status 401 (Não autorizado) com uma mensagem de erro
      res.status(401).json({ resultado: erro.message })
    }
  }

exports.alterarSenha = async(req, res)=>{
    try {
      // Se o usuário não mandou o email ou a senha, um erro é gerado
      if(!req.body.email) throw new Error('Campo email é obrigatório.')
      
      // Procura um usuário no banco com o email enviado
      const pessoa = await Pessoa.findOne({email: req.body.email})

      // Erro é gerado no caso de: usuário não seja encontrado; senha não enviada; senhas não correspondentes
      if(!pessoa) throw new Error('Usuário não encontrado.')
      if(!req.body.senha) throw new Error('Campo senha é obrigatório.')
      if(req.body.senha!=req.body.confirma_senha) throw new Error('As senhas não coincidem.')

      // Criptografa a senha e salva seu valor no objeto que será passado para o banco
      const senhaCriptografada = await bcrypt.hash(req.body.senha, 10)
      pessoa.senha = senhaCriptografada

      // Atualiza documento do usuário no banco com a nova senha
      await Pessoa.updateOne({email: req.body.email}, pessoa)
      return res.status(200).json({resultado: "Senha alterada com sucesso."})
    } catch (erro) {
      // Erro caso email ou senha não tenham sido enviados (400 - Bad Request)
      if(erro.message==='Campo senha é obrigatório.' || erro.message==='Campo email é obrigatório.') return res.status(400).json({resultado: erro.message})
      
      // Erro caso as senhas não sejam iguais (422 - Unprocessable Entity)
      if(erro.message==='As senhas não coincidem.') return res.status(422).json({resultado: erro.message})
      
      // Erro caso usuário não seja encontrado
      res.status(404).json({resultado: erro.message})
    }
}
