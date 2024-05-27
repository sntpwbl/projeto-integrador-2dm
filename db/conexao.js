// Importa a biblioteca dotenv e carrega as variáveis de ambiente do arquivo .env
require("dotenv").config({ path: "./config/.env" });
// Importa a biblioteca mongoose para interagir com o MongoDB
const mongoose = require("mongoose");

// Função assíncrona para estabelecer a conexão com o banco de dados MongoDB
const conexao = async () => {
  try {
    // Tenta estabelecer a conexão com o banco de dados MongoDB usando a URL fornecida no arquivo .env
    await mongoose
      .connect(process.env.MONGODB_STRING)
      .then(() => console.log("Banco conectado"));
  } catch (err) {
    // Se ocorrer algum erro durante a conexão, exibe o erro no console
    console.log(err.message);
  }
};

module.exports = conexao;
