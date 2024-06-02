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
  <li>Crie uma pasta com o nome 'config' e dentro dela um arquivo '.env'. Dentro do arquivo, crie duas variáveis: <br>1) MONGODB_STRING (use a string de conexão com seu banco Mongo) <br>2)SECRET (crie uma string que servirá como o secret de seus tokens)</li>
  <li>Inicie o servidor:<br><code>npm start</code></li>
</ol>

<h1>Rotas</h1>
<strong>POST /auth/cadastrar</strong>: Cadastra um novo usuário no sistema:<br>
<img src="./images/cadastrar.png">
<strong>POST /auth/login</strong>: Retorna um único a partir do seu id;<br>
<strong>PATCH /auth/senha</strong>: Retorna todos os livros com um nome semelhante ao que foi passado;<br><br>

<strong>GET /user/:id</strong>: Insere um novo livro no banco;<br>
<strong>PATCH /user/:id</strong>: Atualiza um livro a partir de seu id;<br>
<strong>DELETE /user/:id</strong>: Deleta um livro a partir de seu id.
