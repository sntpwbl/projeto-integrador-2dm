// Importa o modelo Pessoa para interagir com o banco de dados
const Pessoa = require("../model/Pessoa");
// Importa a biblioteca bcrypt para criptografar senhas
const bcrypt = require("bcrypt");
// Importa a biblioteca jwt para lidar com tokens de autenticação
const jwt = require("jsonwebtoken");

// Função para ler todas as pessoas no banco de dados
exports.lerTodasPessoas = async (_, res) => {
  try {
    // Busca todas as pessoas no banco de dados
    const pessoas = await Pessoa.find();
    // Retorna um status 200 (OK) e as pessoas encontradas em formato JSON
    res.status(200).json(pessoas);
  } catch (erro) {
    // Em caso de erro, retorna um status 500 (Erro interno do servidor) com uma mensagem de erro
    res.status(500).json({ message: "Erro ao encontrar clientes" });
  }
};

//Função para ler a pessoa especifica pelo seu Id
exports.lerPessoaId = async (req, res) => {
  try {
    // Busca uma pessoa pelo ID fornecido nos parâmetros da solicitação, excluindo a senha
    const pessoa = await Pessoa.findById(req.params.id, "-senha");
    // Verifica se a pessoa foi encontrada
    if (!pessoa)
      return res.status(404).json({ message: "Usuário não foi encontrado." });
    // Retorna um status 200 (OK) e a pessoa encontrada em formato JSON
    res.status(200).json(pessoa);
  } catch (erro) {
    // Em caso de erro, retorna um status 500 (Erro interno do servidor) com uma mensagem de erro
    res.status(500).json({ message: "Erro do servidor." });
  }
};

// Função para inserir uma nova pessoa no banco de dados
exports.inserirNovaPessoa = async (req, res) => {
  try {
    // Cria um objeto com os dados da nova pessoa
    const novaPessoa = {
      nome: req.body.nome,
      sobrenome: req.body.sobrenome,
      email: req.body.email,
      senha: req.body.senha,
      telefone: req.body.telefone,
      bio: req.body.bio,
      endereco: req.body.endereco,
      plano: req.body.plano,
    };
    // Verifica se algum campo obrigatório está faltando
    if (
      !novaPessoa.nome ||
      !novaPessoa.sobrenome ||
      !novaPessoa.email ||
      !novaPessoa.senha
    )
      return res
        .status(422)
        .json({ message: "Está faltando um campo obrigatório." });
    // Verifica se a senha e a confirmação de senha coincidem
    if (novaPessoa.senha != req.body.confirma_senha)
      return res
        .status(422)
        .json({ message: "As senhas não coincidem. Tente novamente." });

    // Criptografa a senha antes de salvar
    const hashSenha = await bcrypt.hash(novaPessoa.senha, 10);
    // Atualiza a senha criptografada
    novaPessoa.senha = hashSenha;
    // Cria uma nova pessoa no banco de dados
    await Pessoa.create(novaPessoa);
    // Retorna um status 201 (Created) com uma mensagem de sucesso e os dados da nova pessoa
    res
      .status(201)
      .json({ message: "Cliente inserido com sucesso", result: novaPessoa });
  } catch (erro) {
    // Em caso de erro, retorna um status 500 (Erro interno do servidor) com uma mensagem de erro
    res.status(500).json({ message: erro.message });
  }
};

// Função para atualizar os dados de uma pessoa pelo ID
exports.atualizarPessoa = async (req, res) => {
  try {
    // Atualiza os dados da pessoa com base no ID fornecido
    const pessoaAtualizada = await Pessoa.findByIdAndUpdate(
      req.params.id,
      req.body
    );

    // Verifica se a pessoa foi encontrada e atualizada
    if (!pessoaAtualizada)
      return res.status(404).json({ message: "Usuário não foi encontrado." });
    // Retorna um status 200 (OK) com uma mensagem de sucesso e os dados da pessoa atualizada
    res
      .status(200)
      .json({
        message: "Usuário atualizado com sucesso.",
        result: pessoaAtualizada,
      });
  } catch (err) {
    // Em caso de erro, retorna um status 500 (Erro interno do servidor) com uma mensagem de erro
    res.status(500).json({ message: message.err });
  }
};

// Função para deletar uma pessoa pelo ID
exports.deletarPessoa = async (req, res) => {
  try {
    // Deleta a pessoa com base no ID fornecido
    const pessoaDeletada = await Pessoa.findByIdAndDelete(req.params.id);
    // Verifica se a pessoa foi encontrada e deletada
    if (!pessoaDeletada)
      return res.status(404).json({ message: "Usuário não foi encontrado." });
    // Retorna um status 200 (OK) com uma mensagem de sucesso e os dados da pessoa deletada
    res
      .status(200)
      .json({
        message: "Usuário deletado com sucesso.",
        result: pessoaDeletada,
      });
  } catch (err) {
    // Em caso de erro, retorna um status 500 (Erro interno do servidor) com uma mensagem de erro
    res.status(500).json({ message: err.message });
  }
};

// Função para realizar o login de uma pessoa
exports.realizarLogin = async (req, res) => {
  try {
    // Busca o usuário pelo email fornecido
    const usuario = await Pessoa.findOne({ email: req.body.email });
    // Verifica se o usuário foi encontrado
    if (!usuario)
      return res
        .status(401)
        .json({ statusCode: 401, message: "Email não foi cadastrado." });
    // Compara a senha fornecida com a senha armazenada no banco de dados usando bcrypt
    const senhaValida = await bcrypt.compare(req.body.senha, usuario.senha);
    // Verifica se a senha é válida
    if (!senhaValida)
      return res
        .status(401)
        .json({
          statusCode: 401,
          message: "Senha não corresponde ao email digitado.",
        });
    // Gera um token de autenticação usando jwt
    const token = jwt.sign({ id: usuario._id }, process.env.SECRET);
    // Retorna um status 200 (OK) com o ID do usuário e o token
    res.status(200).json({ id: usuario._id, data: { token } });
  } catch (err) {
    // Em caso de erro, retorna um status 500 (Erro interno do servidor) com uma mensagem de erro
    res.status(500).json({ message: err.message });
  }
};

// Middleware para verificar o token de autenticação
exports.middlewareVerificarToken = (req, res, next) => {
  // Extrai o token do cabeçalho da requisição
  const header = req.headers["authorization"];
  const token = header && header.split(" ")[1];
  // Verifica se o token existe
  if (!token) return res.status(401).json({ message: "Acesso inválido." });

  try {
    // Verifica se o token é válido
    jwt.verify(token, process.env.SECRET);
    next();
  } catch (err) {
    // Em caso de erro, retorna um status 400 (Bad Request) com uma mensagem de erro
    res.status(400).json({ message: "Acesso negado." });
  }
};
