// Importa o modelo Pessoa para interagir com o banco de dados
const Pessoa = require("../model/Pessoa")

//Função para ler a pessoa especifica pelo seu Id
exports.lerPessoaId = async (req, res) => {
  try {
    // Busca uma pessoa pelo ID fornecido nos parâmetros da solicitação, excluindo a senha
    const pessoa = await Pessoa.findById(req.params.id, "-senha")

    // Verifica se a pessoa foi encontrada
    if (!pessoa) throw new Error("Usuário não foi encontrado.")

    // Retorna um status 200 (OK) e a pessoa encontrada em formato JSON
    res.status(200).json(pessoa)
  } catch (erro) {
    // Se o erro que aconteceu for o CastError, retorna uma mensagem personalizada de erro
    if(erro.name === 'CastError') return res.status(400).json({resultado: 'ID de usuário é inválido.'})
    // Em caso de erro, retorna um status dinâmico (404) (Não encontrado) com uma mensagem
    res.status(404).json({ resultado: erro.message })
  }
}


// Função para atualizar os dados de uma pessoa pelo ID
exports.atualizarPessoa = async (req, res) => {
  try {
    if(req.body.senha) throw new Error('Rota para alteração de senha incorreta.')
    
    // Atualiza os dados da pessoa com base no ID fornecido
    const pessoaAtualizada = await Pessoa.findByIdAndUpdate(req.params.id, req.body)

    // Verifica se a pessoa foi encontrada e atualizada
    if (!pessoaAtualizada) throw new Error("Usuário não foi encontrado." )

    // Retorna um status 200 (OK) com uma mensagem de sucesso e os dados da pessoa atualizada
    res.status(200).json({resultado: "Usuário atualizado com sucesso."})

  } catch (erro) {
    // Se o erro que aconteceu for o CastError, retorna uma mensagem personalizada de erro
    if(erro.name === 'CastError') return res.status(400).json({resultado: 'ID de usuário é inválido.'})
    if(erro.message === 'Rota para alteração de senha incorreta.') return res.status(403).json({result: erro.message})
    // Em caso de erro, retorna um status 404 (Não encontrado) com uma mensagem de erro
    res.status(404).json({ resultado: erro.message })
  }
}

// Função para deletar uma pessoa pelo ID
exports.deletarPessoa = async (req, res) => {
  try {
    // Deleta a pessoa com base no ID fornecido
    const pessoaDeletada = await Pessoa.findByIdAndDelete(req.params.id)

    // Verifica se a pessoa foi encontrada e deletada
    if (!pessoaDeletada) throw new Error("Usuário não foi encontrado." )

    // Retorna um status 200 (OK) com uma mensagem de sucesso e os dados da pessoa deletada
    res.status(200).json({resultado: "Usuário deletado com sucesso."})

  } catch (erro) {
    // Se o erro que aconteceu for o CastError, retorna uma mensagem personalizada de erro
    if(erro.name === 'CastError') return res.status(400).json({resultado: 'ID de usuário é inválido.'})
    // Em caso de erro, retorna um status 404 (Não encontrado) com uma mensagem de erro
    res.status(404).json({ resultado: erro.message })
  }
}
