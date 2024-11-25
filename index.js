import express from 'express';

const app = express();
app.use(express.urlencoded({ extended: true })); // Para trabalhar com dados de formulário
app.use(express.json()); // Para trabalhar com JSON

const porta = 3000;
const host = '0.0.0.0';

// Dados de exemplo para autenticação
const usuarios = [{ username: "admin", password: "1234" }];

// Lista de produtos
var listaProduto = [];

// Função para exibir a página de login
function loginView(req, resp) {
    resp.send(`
        <html>
            <head>
                <title>Login</title>
                <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
            </head>
            <body>
                <div class="container" style="margin-top: 50px;">
                    <h1 class="text-center">Login</h1>
                    <form method="POST" action="/login">
                        <div class="mb-3">
                            <label for="username" class="form-label">Usuário</label>
                            <input type="text" class="form-control" id="username" name="username" required>
                        </div>
                        <div class="mb-3">
                            <label for="password" class="form-label">Senha</label>
                            <input type="password" class="form-control" id="password" name="password" required>
                        </div>
                        <button type="submit" class="btn btn-primary w-100">Entrar</button>
                    </form>
                </div>
            </body>
        </html>
    `);
}

// Função para autenticar o usuário
function autenticar(req, resp) {
    const { username, password } = req.body;

    const usuarioValido = usuarios.find(
        (u) => u.username === username && u.password === password
    );

    if (usuarioValido) {
        resp.redirect('/menu');
    } else {
        resp.send(`
            <html>
                <head>
                    <title>Erro no Login</title>
                </head>
                <body style="text-align: center; margin-top: 20%;">
                    <h1 style="color: red;">Credenciais inválidas!</h1>
                    <a class="btn btn-primary" href="/login">Tentar Novamente</a>
                </body>
            </html>
        `);
    }
}

// Função para exibir o menu
function menuView(req, resp) {
    resp.send(`
        <html>
            <head>
                <title>Menu</title>
                <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
            </head>
            <body>
                <div class="container" style="margin-top: 50px;">
                    <h1>Menu</h1>
                    <a href="/cadastrarProduto" class="btn btn-primary">Cadastrar Produto</a>
                    <a href="/listarProdutos" class="btn btn-secondary">Listar Produtos</a>
                </div>
            </body>
        </html>
    `);
}

// Função para exibir a página de cadastro de produtos
function cadastroProdutoView(req, resp) {
    resp.send(`
        <html>
            <head>
                <title>Cadastro de Produtos</title>
                <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
            </head>
            <body>
                <div class="container" style="margin-top: 50px;">
                    <h1>Cadastro de Produtos</h1>
                    <form method="POST" action="/cadastrarProduto">
                        <div class="mb-3">
                            <label for="nomeProduto" class="form-label">Nome Produto</label>
                            <input type="text" class="form-control" id="nomeProduto" name="nomeProduto" required>
                        </div>
                        <div class="mb-3">
                            <label for="Categoria" class="form-label">Categoria</label>
                            <input type="text" class="form-control" id="Categoria" name="Categoria" required>
                        </div>
                        <div class="mb-3">
                            <label for="Código" class="form-label">Código</label>
                            <input type="text" class="form-control" id="Código" name="Código" required>
                        </div>
                        <div class="mb-3">
                            <label for="Modelo" class="form-label">Modelo</label>
                            <input type="text" class="form-control" id="Modelo" name="Modelo" required>
                        </div>
                        <div class="mb-3">
                            <label for="Cor" class="form-label">Cor</label>
                            <select class="form-select" id="Cor" name="Cor">
                                <option value="Vermelho">Vermelho</option>
                                <option value="Verde">Verde</option>
                                <option value="Azul">Azul</option>
                                <option value="Amarelo">Amarelo</option>
                                <option value="Roxo">Roxo</option>
                            </select>
                        </div>
                        <div class="mb-3">
                            <label for="Cep" class="form-label">Cep</label>
                            <input type="text" class="form-control" id="Cep" name="Cep" required>
                        </div>
                        <button type="submit" class="btn btn-primary">Cadastrar</button>
                    </form>
                </div>
            </body>
        </html>
    `);
}

// Função para cadastrar um produto
function cadastrarProduto(req, resp) {
    const { nomeProduto, Categoria, Código, Modelo, Cor, Cep } = req.body;

    listaProduto.push({ nomeProduto, Categoria, Código, Modelo, Cor, Cep });
    resp.send(`
        <html>
            <head>
                <title>Produto Cadastrado</title>
                <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
            </head>
            <body>
                <div class="container" style="margin-top: 50px;">
                    <h1>Produto Cadastrado com Sucesso!</h1>
                    <a href="/cadastrarProduto" class="btn btn-primary">Cadastrar Novo Produto</a>
                    <a href="/menu" class="btn btn-secondary">Voltar ao Menu</a>
                </div>
            </body>
        </html>
    `);
}

// Função para listar os produtos
function listarProdutos(req, resp) {
    let listaHTML = listaProduto.map(p => `
        <tr>
            <td>${p.nomeProduto}</td>
            <td>${p.Categoria}</td>
            <td>${p.Código}</td>
            <td>${p.Modelo}</td>
            <td>${p.Cor}</td>
            <td>${p.Cep}</td>
        </tr>
    `).join('');

    resp.send(`
        <html>
            <head>
                <title>Lista de Produtos</title>
                <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
            </head>
            <body>
                <div class="container" style="margin-top: 50px;">
                    <h1>Lista de Produtos</h1>
                    <table class="table table-striped">
                        <thead>
                            <tr>
                                <th>Nome</th>
                                <th>Categoria</th>
                                <th>Código</th>
                                <th>Modelo</th>
                                <th>Cor</th>
                                <th>Cep</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${listaHTML}
                        </tbody>
                    </table>
                    <a href="/menu" class="btn btn-secondary">Voltar ao Menu</a>
                </div>
            </body>
        </html>
    `);
}

// Rotas
app.get('/login', loginView);
app.post('/login', autenticar);
app.get('/menu', menuView);
app.get('/cadastrarProduto', cadastroProdutoView);
app.post('/cadastrarProduto', cadastrarProduto);
app.get('/listarProdutos', listarProdutos);

// Inicia o servidor
app.listen(porta, host, () => {
    console.log(`Servidor iniciado em http://${host}:${porta}`);
});
