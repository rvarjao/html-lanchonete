# Aula 01 e Aula 02 — HTML + JavaScript + CSV + LocalStorage

## Objetivo geral

Nesta atividade, vamos construir uma página simples para exibir dados de vendas de uma lanchonete.

A ideia é fazer aos poucos:

1. criar uma página HTML;
2. criar uma tabela;
3. ler os dados de um arquivo CSV;
4. mostrar os dados na tabela usando JavaScript;
5. depois criar um formulário;
6. salvar novos dados no `localStorage`;
7. recarregar a tabela com os dados atualizados.

---

# Aula 01 — Lendo um CSV e preenchendo uma tabela

## Parte 1 — Criar os arquivos do projeto

Crie uma pasta para o projeto.

Dentro dela, crie os seguintes arquivos:

    index.html
    index.js
    dados.csv

A estrutura do projeto ficará assim:

    projeto-lanchonete/
        index.html
        index.js
        dados.csv

---

## Parte 2 — Criar o arquivo CSV

No arquivo `dados.csv`, coloque os dados abaixo:

    ID,Data,Nome,Produto,Quantidade,Preço,Total
    1,2026-05-01,Ana,Coxinha,2,6.00,12.00
    2,2026-05-01,Bruno,Suco,1,8.00,8.00
    3,2026-05-02,Carla,Pão de queijo,3,4.00,12.00
    4,2026-05-02,Daniel,Refrigerante,2,7.00,14.00
    5,2026-05-03,Eduarda,Sanduíche,1,15.00,15.00

Observe que a primeira linha contém os nomes das colunas:

    ID,Data,Nome,Produto,Quantidade,Preço,Total

As próximas linhas contêm os dados.

Cada informação é separada por vírgula.

---

## Parte 3 — Criar o HTML inicial

No arquivo `index.html`, escreva:

    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <script src="index.js"></script>
        <title>Document</title>
    </head>
    <body>
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

## Parte 4 — Entendendo a tabela

No HTML, temos uma tabela:

    <table id="tabela-dados">

O `id` é importante porque o JavaScript vai usar esse nome para encontrar a tabela.

Dentro da tabela, temos:

    <thead>

O `thead` é o cabeçalho da tabela.

Também temos:

    <tbody></tbody>

O `tbody` é o corpo da tabela.

É dentro do `tbody` que o JavaScript vai adicionar as linhas com os dados do CSV.

---

## Parte 5 — Criar o JavaScript para ler o CSV

No arquivo `index.js`, escreva:

    fetch('dados.csv')
        .then(response => response.text())
        .then(data => {
            const linhas = data.split('\n');
            const tabela = document.getElementById('tabela-dados');

            linhas.forEach((linha, index) => {
                if (index === 0) {
                    return;
                }

                const colunas = linha.split(',');

                if (colunas.length < 7) {
                    return;
                }

                const tr = document.createElement('tr');

                colunas.forEach((coluna, i) => {
                    const td = document.createElement('td');
                    td.textContent = coluna;
                    tr.appendChild(td);
                });

                tabela.appendChild(tr);
            });
        })
        .catch(error => {
            console.error('Erro ao carregar os dados:', error);
        });

---

## Parte 6 — Entendendo o código JavaScript

### 1. Buscar o arquivo CSV

    fetch('dados.csv')

O `fetch` pede para o navegador carregar o arquivo `dados.csv`.

### 2. Transformar a resposta em texto

    .then(response => response.text())

O arquivo CSV é um arquivo de texto.

Por isso, precisamos transformar a resposta em texto.

### 3. Separar o texto em linhas

    const linhas = data.split('\n');

Aqui estamos separando o CSV linha por linha.

Cada quebra de linha vira um item dentro do array `linhas`.

### 4. Encontrar a tabela no HTML

    const tabela = document.getElementById('tabela-dados');

Essa linha procura no HTML o elemento que tem o id `tabela-dados`.

### 5. Percorrer cada linha

    linhas.forEach((linha, index) => {

Aqui o JavaScript vai passar por todas as linhas do CSV.

O `index` mostra a posição da linha.

A primeira linha tem `index` igual a `0`.

### 6. Ignorar o cabeçalho

    if (index === 0) {
        return;
    }

A primeira linha do CSV tem os nomes das colunas.

Como esses nomes já estão no HTML, vamos ignorar essa linha.

### 7. Separar as colunas

    const colunas = linha.split(',');

Cada linha do CSV tem dados separados por vírgula.

Essa linha transforma uma linha em várias colunas.

Por exemplo:

    1,2026-05-01,Ana,Coxinha,2,6.00,12.00

vira algo parecido com:

    ["1", "2026-05-01", "Ana", "Coxinha", "2", "6.00", "12.00"]

### 8. Ignorar linhas incompletas

    if (colunas.length < 7) {
        return;
    }

Se a linha não tiver todas as 7 colunas, ela será ignorada.

### 9. Criar uma linha da tabela

    const tr = document.createElement('tr');

Aqui criamos uma nova linha HTML.

### 10. Criar as células da tabela

    colunas.forEach((coluna, i) => {
        const td = document.createElement('td');
        td.textContent = coluna;
        tr.appendChild(td);
    });

Para cada coluna, criamos uma célula `<td>`.

Depois colocamos essa célula dentro da linha `<tr>`.

### 11. Adicionar a linha na tabela

    tabela.appendChild(tr);

Aqui colocamos a linha criada dentro da tabela.

---

## Parte 7 — Testar o projeto

Para testar corretamente, não abra o arquivo diretamente com duplo clique.

Use o Live Server do VS Code.

Passos:

1. abra a pasta do projeto no VS Code;
2. instale a extensão Live Server, se ainda não tiver;
3. clique com o botão direito no `index.html`;
4. clique em `Open with Live Server`.

Se tudo estiver correto, a tabela será preenchida com os dados do CSV.

---

## Checkpoint da Aula 01

Ao final da Aula 01, você deve ter:

- um arquivo `index.html`;
- um arquivo `index.js`;
- um arquivo `dados.csv`;
- uma tabela aparecendo na tela;
- os dados do CSV carregados automaticamente na tabela.

---

