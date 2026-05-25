
## Parte 10 — Alterar o HTML para ter um formulário

Agora vamos adicionar um formulário antes da tabela.

Atualize o arquivo `index.html` para ficar assim:

    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <script src="index.js" defer></script>
        <title>Document</title>
    </head>
    <body>
        <h1>Vendas da Lanchonete</h1>

        <form id="form-venda">
            <div>
                <label for="data">Data</label>
                <input type="date" id="data" name="data">
            </div>

            <div>
                <label for="nome">Nome</label>
                <input type="text" id="nome" name="nome">
            </div>

            <div>
                <label for="produto">Produto</label>
                <input type="text" id="produto" name="produto">
            </div>

            <div>
                <label for="quantidade">Quantidade</label>
                <input type="number" id="quantidade" name="quantidade">
            </div>

            <div>
                <label for="preco">Preço</label>
                <input type="number" id="preco" name="preco" step="0.01">
            </div>

            <button type="submit">Adicionar venda</button>
        </form>

        <hr>

        <table id="tabela-dados">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Data</th>
                    <th>Nome</th>
                    <th>Produto</th>
                    <th>Quantidade</th>
                    <th>Preço</th>
                    <th>Total</th>
                </tr>
            </thead>
            <tbody></tbody>
        </table>
    </body>
    </html>

---

## Parte 1 — Por que usamos defer no script?

Na Aula 01, usamos:

    <script src="index.js"></script>

Agora usamos:

    <script src="index.js" defer></script>

O `defer` faz o navegador carregar o JavaScript depois de ler o HTML.

Isso ajuda a evitar erros quando o JavaScript tenta encontrar elementos que ainda não foram carregados.

---

## Parte 2 — Entendendo o formulário

O formulário começa aqui:

    <form id="form-venda">

Esse `id` será usado no JavaScript.

Cada campo tem um `id`.

Exemplo:

    <input type="text" id="nome" name="nome">

O JavaScript vai usar esse `id` para pegar o valor digitado.

---

## Parte 3 — O que acontece ao clicar no botão?

O botão tem:

    <button type="submit">Adicionar venda</button>

Quando clicamos nesse botão, o formulário tenta fazer um envio.

Esse envio é chamado de `submit`.

Em sistemas com servidor, normalmente esse envio poderia ser feito usando `POST`.

---

## Parte 4 — O que é POST?

`POST` é uma forma de enviar dados para um servidor.

Por exemplo, quando você preenche um cadastro em um site, o navegador pode enviar os dados usando `POST`.

Fluxo comum em um sistema real:

    Usuário preenche o formulário
    Usuário clica no botão
    Navegador envia os dados com POST
    Servidor recebe os dados
    Servidor salva os dados em um banco de dados
    Página mostra os dados atualizados

Nesta aula ainda não teremos servidor.

Então o nosso fluxo será:

    Usuário preenche o formulário
    Usuário clica no botão
    JavaScript impede o envio padrão
    JavaScript pega os dados dos inputs
    JavaScript salva no localStorage
    JavaScript carrega novamente a tabela

---

## Parte 5 — Capturar o submit do formulário

No final do `index.js`, vamos adicionar um evento para o formulário.

Escreva:

    const formulario = document.getElementById('form-venda');

    formulario.addEventListener('submit', function(event) {
        event.preventDefault();

        console.log('Formulário enviado');
    });

---

## Parte 6 — Entendendo o preventDefault

A linha abaixo impede o comportamento padrão do formulário:

    event.preventDefault();

Sem essa linha, o navegador poderia tentar recarregar a página.

Como queremos controlar tudo com JavaScript, usamos `preventDefault`.

---

## Parte 7 — Pegar os valores dos campos

Dentro do evento de submit, adicione:

    const data = document.getElementById('data').value;
    const nome = document.getElementById('nome').value;
    const produto = document.getElementById('produto').value;
    const quantidade = document.getElementById('quantidade').value;
    const preco = document.getElementById('preco').value;

Essas linhas pegam os valores digitados pelo usuário.

---

## Parte 8 — Criar o total

O total será:

    quantidade x preço

Adicione:

    const total = quantidade * preco;

---

## Parte 9 — Criar o novo ID

Precisamos descobrir qual será o próximo ID.

Para isso, buscamos os dados salvos:

    const dadosSalvos = localStorage.getItem('dadosLanchonete');
    const dados = JSON.parse(dadosSalvos);

Depois criamos o próximo ID:

    const novoId = dados.length + 1;

---

## Parte 10 — Criar uma nova linha de dados

Agora criamos um array com os dados da nova venda:

    const novaVenda = [
        novoId,
        data,
        nome,
        produto,
        quantidade,
        preco,
        total
    ];

---

## Parte 11 — Adicionar a nova venda no array

Agora adicionamos a nova venda dentro do array:

    dados.push(novaVenda);

---

## Parte 12 — Salvar novamente no LocalStorage

Depois salvamos o array atualizado:

    localStorage.setItem('dadosLanchonete', JSON.stringify(dados));

---

## Parte 13 — Recarregar a tabela

Depois de salvar, chamamos novamente:

    carregarTabela();

Assim a tabela aparece atualizada.

---

## Parte 14 — Limpar o formulário

Depois de adicionar a venda, podemos limpar o formulário:

    formulario.reset();

---

## Parte 15 — Código completo do submit

O código do submit fica assim:

    const formulario = document.getElementById('form-venda');

    formulario.addEventListener('submit', function(event) {
        event.preventDefault();

        const data = document.getElementById('data').value;
        const nome = document.getElementById('nome').value;
        const produto = document.getElementById('produto').value;
        const quantidade = document.getElementById('quantidade').value;
        const preco = document.getElementById('preco').value;

        const total = quantidade * preco;

        const dadosSalvos = localStorage.getItem('dadosLanchonete');
        const dados = JSON.parse(dadosSalvos);

        const novoId = dados.length + 1;

        const novaVenda = [
            novoId,
            data,
            nome,
            produto,
            quantidade,
            preco,
            total
        ];

        dados.push(novaVenda);

        localStorage.setItem('dadosLanchonete', JSON.stringify(dados));

        carregarTabela();

        formulario.reset();
    });

---

## Parte 16 — Código final do index.js da Aula 02

Seu arquivo `index.js` deve ficar assim:

    function carregarDadosIniciais() {
        fetch('dados.csv')
            .then(response => response.text())
            .then(data => {
                const linhas = data.split('\n');
                const dados = [];

                linhas.forEach((linha, index) => {
                    if (index === 0) {
                        return;
                    }

                    const colunas = linha.split(',');

                    if (colunas.length < 7) {
                        return;
                    }

                    dados.push(colunas);
                });

                localStorage.setItem('dadosLanchonete', JSON.stringify(dados));

                carregarTabela();
            })
            .catch(error => {
                console.error('Erro ao carregar os dados:', error);
            });
    }

    function carregarTabela() {
        const dadosSalvos = localStorage.getItem('dadosLanchonete');
        const dados = JSON.parse(dadosSalvos);

        const tabela = document.getElementById('tabela-dados');
        const tbody = tabela.querySelector('tbody');

        tbody.innerHTML = '';

        dados.forEach(colunas => {
            const tr = document.createElement('tr');

            colunas.forEach(coluna => {
                const td = document.createElement('td');
                td.textContent = coluna;
                tr.appendChild(td);
            });

            tbody.appendChild(tr);
        });
    }

    if (localStorage.getItem('dadosLanchonete')) {
        carregarTabela();
    } else {
        carregarDadosIniciais();
    }

    const formulario = document.getElementById('form-venda');

    formulario.addEventListener('submit', function(event) {
        event.preventDefault();

        const data = document.getElementById('data').value;
        const nome = document.getElementById('nome').value;
        const produto = document.getElementById('produto').value;
        const quantidade = document.getElementById('quantidade').value;
        const preco = document.getElementById('preco').value;

        const total = quantidade * preco;

        const dadosSalvos = localStorage.getItem('dadosLanchonete');
        const dados = JSON.parse(dadosSalvos);

        const novoId = dados.length + 1;

        const novaVenda = [
            novoId,
            data,
            nome,
            produto,
            quantidade,
            preco,
            total
        ];

        dados.push(novaVenda);

        localStorage.setItem('dadosLanchonete', JSON.stringify(dados));

        carregarTabela();

        formulario.reset();
    });

---

## Parte 17 — Testar a Aula 02

Agora faça os testes:

1. abra a página com Live Server;
2. veja se a tabela aparece com os dados do CSV;
3. preencha o formulário;
4. clique em `Adicionar venda`;
5. veja se uma nova linha aparece na tabela;
6. atualize a página;
7. veja se a nova linha continua aparecendo.

Se a nova linha continuar aparecendo, significa que o `localStorage` funcionou.

---

## Parte 18 — Como limpar os dados salvos

Se quiser voltar aos dados originais do CSV, abra o console do navegador e digite:

    localStorage.removeItem('dadosLanchonete');

Depois atualize a página.

O sistema vai carregar novamente os dados do CSV.

---

## Desafio 1 — Melhorar o total

Hoje o total pode aparecer com muitas casas decimais.

Tente trocar:

    const total = quantidade * preco;

por:

    const total = (quantidade * preco).toFixed(2);

---

## Desafio 2 — Não deixar campos vazios

Antes de salvar, verifique se algum campo está vazio.

Exemplo:

    if (nome === '') {
        alert('Digite o nome');
        return;
    }

Tente fazer o mesmo para:

- data;
- produto;
- quantidade;
- preço.

---

## Desafio 3 — Mostrar o valor total vendido

Crie uma área no HTML para mostrar a soma de todas as vendas.

Exemplo:

    <p id="total-geral"></p>

Depois tente calcular o total de todas as linhas usando JavaScript.

---

## Desafio 4 — Criar botão para limpar os dados

Crie um botão para limpar o `localStorage`.

Quando clicar, ele deve fazer:

    localStorage.removeItem('dadosLanchonete');

Depois deve recarregar a página:

    location.reload();

---

## Resumo da Aula 01

Na Aula 01, aprendemos:

- criar uma tabela HTML;
- criar um arquivo CSV;
- usar `fetch`;
- transformar CSV em texto;
- separar linhas;
- separar colunas;
- criar elementos HTML com JavaScript;
- preencher uma tabela automaticamente.

---

## Resumo da Aula 02

Na Aula 02, aprendemos:

- organizar código em funções;
- usar `localStorage`;
- usar `JSON.stringify`;
- usar `JSON.parse`;

---

## Resumo da Aula 03

- criar um formulário;
- capturar o evento `submit`;
- impedir o envio padrão com `preventDefault`;
- adicionar dados novos;
- atualizar a tabela na tela.

---

## Próximos passos possíveis

Como desafios adicionais, podemos evoluir para:

1. adicionar CSS;
2. usar Bootstrap;
3. criar filtros por produto;
4. calcular totais;
5. exportar um novo CSV;
6. criar um backend simples;
7. salvar os dados em SQLite;
8. criar uma tela de login.
