# Aula 02 — Formulário com LocalStorage

## Objetivo da Aula 02

Na Aula 01, os dados eram carregados do arquivo `dados.csv`.

Agora vamos fazer algo novo:

1. organizar o código JavaScript em funções;
2. salvar os dados no `localStorage`;
3. criar um formulário no HTML;
4. adicionar uma nova venda pela tela;
5. atualizar a tabela.

---

## Parte 1 — O que é LocalStorage?

O `localStorage` é uma forma de salvar dados no navegador.

Ele funciona como uma pequena memória do navegador.

Exemplo:

    localStorage.setItem('nome', 'Ana');

Depois podemos buscar esse valor:

    const nome = localStorage.getItem('nome');

Importante:

O `localStorage` não salva os dados no arquivo CSV.

Ele salva os dados no navegador.

Se você abrir em outro computador, os dados adicionados não estarão lá.

---

## Parte 2 — Por que não salvamos diretamente no CSV?

O JavaScript do navegador consegue ler o arquivo CSV usando `fetch`.

Mas ele não pode alterar diretamente o arquivo `dados.csv`.

Isso acontece por segurança.

Imagine se qualquer site pudesse alterar arquivos livremente. Isso seria perigoso.

Para salvar dados de verdade em um arquivo ou banco de dados, precisaríamos de um servidor.

Exemplos de servidor:

- Python com Flask;
- Node.js;
- PHP;
- Laravel.

Nesta aula, vamos usar `localStorage` para simular esse armazenamento.

---

## Parte 3 — Criar uma função para carregar os dados iniciais

No `index.js`, vamos transferir o código inicial para uma função chamada:

    carregarDadosIniciais()

Apague o código atual do `index.js` e comece com:

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

---

## Parte 4 — Entendendo a função carregarDadosIniciais

Essa função faz quase a mesma coisa da Aula 01.

A diferença é que agora ela não coloca os dados direto na tabela.

Ela coloca os dados dentro de um array:

    const dados = [];

Depois, cada linha do CSV é adicionada nesse array:

    dados.push(colunas);

No final, salvamos os dados no `localStorage`:

    localStorage.setItem('dadosLanchonete', JSON.stringify(dados));

---

## Parte 5 — Por que usamos JSON.stringify?

O `localStorage` só consegue salvar textos.

Mas o nosso array é uma estrutura de dados do JavaScript.

Por isso, precisamos transformar o array em texto.

Usamos:

    JSON.stringify(dados)

Depois, quando quisermos recuperar esses dados, vamos usar:

    JSON.parse(...)

---

## Parte 6 — Criar a função carregarTabela

Agora crie a função `carregarTabela`.

Ela vai buscar os dados do `localStorage` e mostrar na tabela.

No `index.js`, abaixo da função anterior, escreva:

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

---

## Parte 7 — Entendendo a função carregarTabela

### 1. Buscar os dados salvos

    const dadosSalvos = localStorage.getItem('dadosLanchonete');

Essa linha busca os dados salvos no navegador.

### 2. Transformar o texto em array novamente

    const dados = JSON.parse(dadosSalvos);

O `JSON.parse` transforma o texto salvo em array novamente.

### 3. Encontrar o corpo da tabela

    const tbody = tabela.querySelector('tbody');

Agora vamos adicionar as linhas dentro do `tbody`.

### 4. Limpar a tabela antes de carregar

    tbody.innerHTML = '';

Isso evita que os dados sejam duplicados na tela.

### 5. Criar as linhas novamente

    dados.forEach(colunas => {
        const tr = document.createElement('tr');

        colunas.forEach(coluna => {
            const td = document.createElement('td');
            td.textContent = coluna;
            tr.appendChild(td);
        });

        tbody.appendChild(tr);
    });

Aqui estamos reconstruindo a tabela com base nos dados salvos.

---

## Parte 8 — Verificar se já existe LocalStorage

Agora precisamos decidir:

- se já existem dados no `localStorage`, carregamos a tabela;
- se não existem dados no `localStorage`, carregamos o CSV pela primeira vez.

No final do `index.js`, escreva:

    if (localStorage.getItem('dadosLanchonete')) {
        carregarTabela();
    } else {
        carregarDadosIniciais();
    }

---

## Parte 9 — Código JavaScript até aqui

Seu `index.js` deve estar assim:

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

// Deve-se aguardar o carregamento do DOM para verificar o localStorage
    window.onload = function() {
        if (localStorage.getItem('dadosLanchonete')) {
            carregarTabela();
        } else {
            carregarDadosIniciais();
        }
    }

---
