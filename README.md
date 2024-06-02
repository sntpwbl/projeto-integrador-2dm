<h1>Projeto Integrador 2DM - GymRats</h1>

<h1>Tecnologias utilizadas</h1>
<strong>Node.js</strong> - v20.10.0<br>
<strong>Express</strong> - v4.19.2<br>
<strong>Mongoose</strong> - v8.3.2<br>
<strong>bcrypt</strong> - v5.1.1<br>
<strong>JSON Web Token</strong> - v9.0.2

<h1>Requisitos</h1>
<strong>npm</strong> - v10.2.3

<h1>Utilização</h1>
<ol>
  <li>Clone esse repositório:<br><code>git clone https://github.com/sntpwbl/projeto-integrador-2dm.git</code></li><br>
  <li>Navegue até o diretório gerado:<br><code>cd projeto-integrador-2dm</code></li><br>
  <li>Instale as dependências da API:<br><code>npm install</code></li><br>
  <li>Crie uma pasta com o nome 'config' e dentro dela um arquivo '.env'. Dentro do arquivo, crie duas variáveis: <br>1) MONGODB_STRING (use a string de conexão com seu banco Mongo) <br>2) SECRET (crie uma string que servirá como o secret de seus tokens)</li><br>
  <li>Inicie o servidor:<br><code>npm start</code></li>
</ol>

<h1>Rotas</h1>

<strong>POST /auth/cadastrar</strong>: Cadastra um novo usuário no sistema:<br>
<img src="./imgs/cadastrar.png" alt="cadastrar">

<strong>POST /auth/login</strong>: Retorna um token de acesso baseado no secret da aplicação caso os dados do usuário estejam corretos. Este token contém o ID do usuário dentro do banco:<br>
<img src="./imgs/login.png" alt="login">

<strong>PATCH /auth/senha</strong>: Altera a senha de um usuário cadastrado no sistema:<br>
<img src="./imgs/alterarsenha.png" alt="senha"><br><br><br>

<strong>GET /user/:id</strong>: Retorna os dados relacionados à um usuário:<br>
<img src="./imgs/getuser.png" alt="get">

<strong>PATCH /user/:id</strong>: Atualiza dados específicos de um usuário:<br>
<img src="./imgs/alteraruser.png" alt="patch">
Apesar da imagem mostrar uma requisição PUT, use PATCH.

<strong>DELETE /user/:id</strong>: Deleta usuário do sistema:<br>
<img src="./imgs/deletaruser.png" alt="delete">

<h1>Observações</h1>
<ol>
  <li>Todas as rotas <strong>/api/user/:id</strong> vão requerir um <strong>token</strong> para serem executadas com sucesso. Você pode armazenar o token do usuário no armazenamento local ou em memória para utilizá-lo nessas requisições. Envie-o pelo
    cabeçalho da requisição no campo 'Authorization';</li>
  <li>Os tokens emitidos na rota de login contém o <strong>id</strong> do usuário. Descriptografe o token (recomendação: jwt-decode) e abstraia o valor do id para usá-lo nas rotas. Ainda assim é necessário enviar o token na requisição. O token enviado na requisição deve conter o id usado nos parâmetros da rota.</li>
</ol>
