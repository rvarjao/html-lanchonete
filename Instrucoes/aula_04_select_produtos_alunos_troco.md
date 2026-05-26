# Aula 04 — Select de Alunos e Produtos + Cálculo de Troco

## Objetivo da aula

Nesta aula, vamos melhorar o sistema da lanchonete.

Nas aulas anteriores, o usuário digitava o nome do aluno e o nome do produto em campos de texto.

Agora vamos trocar esses campos por listas de seleção.

Também vamos adicionar uma parte para o usuário informar o valor pago e o sistema calcular o troco.

Ao final da aula, o sistema deverá:

1. carregar uma lista de alunos;
2. carregar uma lista de produtos;
3. salvar alunos e produtos no `localStorage`;
4. usar `<select>` para escolher aluno e produto;
5. preencher automaticamente o preço do produto;
6. calcular o total da venda;
7. receber o valor pago;
8. calcular o troco.

---

# Parte 1 — Por que trocar input text por select?

Antes, tínhamos campos assim:

    <input type="text" id="nome" name="nome">

    <input type="text" id="produto" name="produto">

Isso funciona, mas pode gerar problemas.

Exemplo:

    Ana
    ana
    Anna
    ANA

Para o computador, esses textos podem ser considerados diferentes.

O mesmo acontece com produtos:

    Coxinha
    coxinha
    Coxinha de frango
    coxinha frango

Por isso, usar `<select>` ajuda a padronizar os dados.

---

# Parte 2 — Select ou botões para produtos?

Existem duas possibilidades interessantes.

## Opção 1 — Select

Exemplo:

    <select id="produto" name="produto">
        <option value="">Selecione um produto</option>
        <option value="Coxinha">Coxinha</option>
        <option value="Suco">Suco</option>
        <option value="Pão de queijo">Pão de queijo</option>
    </select>

Vantagens:

- mais simples de programar;
- ocupa pouco espaço na tela;
- funciona bem quando existem muitos produtos;
- evita erro de digitação.

Desvantagens:

- o operador precisa abrir a lista;
- pode ser menos rápido para vendas repetitivas.

## Opção 2 — Botões de produtos

Exemplo:

    [Coxinha] [Suco] [Pão de queijo] [Refrigerante]

Vantagens:

- mais rápido para o operador;
- parecido com sistemas reais de caixa;
- bom para produtos mais vendidos;
- facilita o uso em telas touch.

Desvantagens:

- ocupa mais espaço;
- exige um pouco mais de JavaScript;
- pode ficar bagunçado se houver muitos produtos.

## Decisão para esta aula

Nesta aula, vamos começar com `<select>`.

Ele é mais simples para entender a lógica.

Depois, como desafio ou evolução, podemos transformar os produtos em botões.

---

# Parte 3 — Criar listas iniciais de alunos e produtos

No `index.js`, vamos criar duas funções:

    carregarAlunosIniciais()

    carregarProdutosIniciais()

Essas funções vão verificar se já existem alunos e produtos no `localStorage`.

Se não existirem, vamos criar dados iniciais.

---

# Parte 4 — Criar os alunos iniciais

Adicione esta função no `index.js`:

    function carregarAlunosIniciais() {
        if (localStorage.getItem('alunosLanchonete')) {
            return;
        }

        const alunos = [
            'Ana',
            'Bruno',
            'Carla',
            'Daniel',
            'Eduarda'
        ];

        localStorage.setItem('alunosLanchonete', JSON.stringify(alunos));
    }

---

# Parte 5 — Entendendo a função carregarAlunosIniciais

A linha abaixo verifica se já existem alunos salvos:

    if (localStorage.getItem('alunosLanchonete')) {
        return;
    }

Se já existir, a função para ali.

Isso evita apagar dados antigos.

Depois criamos um array:

    const alunos = [
        'Ana',
        'Bruno',
        'Carla',
        'Daniel',
        'Eduarda'
    ];

E salvamos no `localStorage`:

    localStorage.setItem('alunosLanchonete', JSON.stringify(alunos));

---

# Parte 6 — Criar os produtos iniciais

Agora adicione a função:

    function carregarProdutosIniciais() {
        if (localStorage.getItem('produtosLanchonete')) {
            return;
        }

        const produtos = [
            {
                nome: 'Coxinha',
                preco: 6.00
            },
            {
                nome: 'Suco',
                preco: 8.00
            },
            {
                nome: 'Pão de queijo',
                preco: 4.00
            },
            {
                nome: 'Refrigerante',
                preco: 7.00
            },
            {
                nome: 'Sanduíche',
                preco: 15.00
            }
        ];

        localStorage.setItem('produtosLanchonete', JSON.stringify(produtos));
    }

---

# Parte 7 — Por que produto é um objeto?

Os alunos foram salvos assim:

    'Ana'

Mas os produtos foram salvos assim:

    {
        nome: 'Coxinha',
        preco: 6.00
    }

Isso acontece porque o aluno só precisa de um nome.

Já o produto precisa de pelo menos duas informações:

- nome;
- preço.

Então usamos um objeto.

---

# Parte 8 — Atualizar o HTML do formulário

Agora vamos trocar os campos de texto por `select`.

No `index.html`, encontre esta parte:

    <div>
        <label for="nome">Nome</label>
        <input type="text" id="nome" name="nome">
    </div>

Troque por:

    <div>
        <label for="aluno">Aluno</label>
        <select id="aluno" name="aluno">
            <option value="">Selecione um aluno</option>
        </select>
    </div>

Agora encontre esta parte:

    <div>
        <label for="produto">Produto</label>
        <input type="text" id="produto" name="produto">
    </div>

Troque por:

    <div>
        <label for="produto">Produto</label>
        <select id="produto" name="produto">
            <option value="">Selecione um produto</option>
        </select>
    </div>

---

# Parte 9 — Atualizar o campo de preço

Como o preço virá do produto escolhido, podemos deixar o campo de preço somente para leitura.

Encontre o campo de preço:

    <input type="number" id="preco" name="preco" step="0.01">

Troque por:

    <input type="number" id="preco" name="preco" step="0.01" readonly>

O `readonly` significa que o usuário não deve digitar manualmente nesse campo.

O JavaScript vai preencher o preço automaticamente.

---

# Parte 10 — Adicionar valor pago e troco no HTML

Depois do campo de preço, adicione:

    <div>
        <label for="valor-pago">Valor pago</label>
        <input type="number" id="valor-pago" name="valor-pago" step="0.01">
    </div>

    <div>
        <label for="troco">Troco</label>
        <input type="number" id="troco" name="troco" step="0.01" readonly>
    </div>

O usuário vai digitar o valor pago.

O sistema vai calcular o troco.

---

# Parte 11 — HTML do formulário atualizado

O formulário deve ficar assim:

    <form id="form-venda">
        <div>
            <label for="data">Data</label>
            <input type="date" id="data" name="data">
        </div>

        <div>
            <label for="aluno">Aluno</label>
            <select id="aluno" name="aluno">
                <option value="">Selecione um aluno</option>
            </select>
        </div>

        <div>
            <label for="produto">Produto</label>
            <select id="produto" name="produto">
                <option value="">Selecione um produto</option>
            </select>
        </div>

        <div>
            <label for="quantidade">Quantidade</label>
            <input type="number" id="quantidade" name="quantidade">
        </div>

        <div>
            <label for="preco">Preço</label>
            <input type="number" id="preco" name="preco" step="0.01" readonly>
        </div>

        <div>
            <label for="valor-pago">Valor pago</label>
            <input type="number" id="valor-pago" name="valor-pago" step="0.01">
        </div>

        <div>
            <label for="troco">Troco</label>
            <input type="number" id="troco" name="troco" step="0.01" readonly>
        </div>

        <button type="submit">Adicionar venda</button>
    </form>

---

# Parte 12 — Popular o select de alunos

Agora vamos criar uma função para preencher o select de alunos.

No `index.js`, adicione:

    function popularSelectAlunos() {
        const alunosSalvos = localStorage.getItem('alunosLanchonete');
        const alunos = JSON.parse(alunosSalvos);

        const selectAluno = document.getElementById('aluno');

        alunos.forEach(aluno => {
            const option = document.createElement('option');
            option.value = aluno;
            option.textContent = aluno;

            selectAluno.appendChild(option);
        });
    }

---

# Parte 13 — Entendendo o select de alunos

Buscamos os alunos salvos:

    const alunosSalvos = localStorage.getItem('alunosLanchonete');

Transformamos o texto em array:

    const alunos = JSON.parse(alunosSalvos);

Encontramos o select:

    const selectAluno = document.getElementById('aluno');

Para cada aluno, criamos um option:

    const option = document.createElement('option');

Definimos o valor:

    option.value = aluno;

Definimos o texto que aparece na tela:

    option.textContent = aluno;

E adicionamos no select:

    selectAluno.appendChild(option);

---

# Parte 14 — Popular o select de produtos

Agora crie a função:

    function popularSelectProdutos() {
        const produtosSalvos = localStorage.getItem('produtosLanchonete');
        const produtos = JSON.parse(produtosSalvos);

        const selectProduto = document.getElementById('produto');

        produtos.forEach(produto => {
            const option = document.createElement('option');
            option.value = produto.nome;
            option.textContent = produto.nome;

            selectProduto.appendChild(option);
        });
    }

---

# Parte 15 — Chamar as funções iniciais

No final do `index.js`, antes de trabalhar com o formulário, chame:

    carregarAlunosIniciais();
    carregarProdutosIniciais();
    popularSelectAlunos();
    popularSelectProdutos();

Atenção:

Essas funções precisam ser chamadas depois que o HTML já foi carregado.

Por isso é importante que no HTML o script esteja com `defer`:

    <script src="index.js" defer></script>

---

# Parte 16 — Preencher o preço automaticamente

Quando o usuário escolher um produto, queremos preencher o preço.

Adicione no `index.js`:

    const selectProduto = document.getElementById('produto');

    selectProduto.addEventListener('change', function() {
        const produtoSelecionado = selectProduto.value;

        const produtosSalvos = localStorage.getItem('produtosLanchonete');
        const produtos = JSON.parse(produtosSalvos);

        const produtoEncontrado = produtos.find(produto => produto.nome === produtoSelecionado);

        if (produtoEncontrado) {
            document.getElementById('preco').value = produtoEncontrado.preco;
        } else {
            document.getElementById('preco').value = '';
        }
    });

---

# Parte 17 — Entendendo o evento change

O evento `change` acontece quando o usuário troca a opção de um campo.

Neste caso:

    selectProduto.addEventListener('change', function() {

O código será executado quando o usuário escolher um produto.

Pegamos o produto escolhido:

    const produtoSelecionado = selectProduto.value;

Buscamos a lista de produtos:

    const produtosSalvos = localStorage.getItem('produtosLanchonete');
    const produtos = JSON.parse(produtosSalvos);

Procuramos o produto escolhido:

    const produtoEncontrado = produtos.find(produto => produto.nome === produtoSelecionado);

Se encontrou, colocamos o preço no campo:

    document.getElementById('preco').value = produtoEncontrado.preco;

---

# Parte 18 — Criar função para calcular total e troco

Agora vamos criar uma função para calcular o total e o troco.

Adicione no `index.js`:

    function calcularTroco() {
        const quantidade = Number(document.getElementById('quantidade').value);
        const preco = Number(document.getElementById('preco').value);
        const valorPago = Number(document.getElementById('valor-pago').value);

        const total = quantidade * preco;
        const troco = valorPago - total;

        if (valorPago > 0) {
            document.getElementById('troco').value = troco.toFixed(2);
        }
    }

---

# Parte 19 — Entendendo o cálculo do troco

Pegamos a quantidade:

    const quantidade = Number(document.getElementById('quantidade').value);

Pegamos o preço:

    const preco = Number(document.getElementById('preco').value);

Pegamos o valor pago:

    const valorPago = Number(document.getElementById('valor-pago').value);

Calculamos o total:

    const total = quantidade * preco;

Calculamos o troco:

    const troco = valorPago - total;

Exemplo:

    quantidade = 2
    preco = 6
    valorPago = 20

Então:

    total = 2 x 6
    total = 12

    troco = 20 - 12
    troco = 8

---

# Parte 20 — Calcular troco automaticamente

Queremos calcular o troco quando o usuário alterar:

- quantidade;
- produto;
- valor pago.

Adicione:

    document.getElementById('quantidade').addEventListener('input', calcularTroco);
    document.getElementById('valor-pago').addEventListener('input', calcularTroco);
    document.getElementById('produto').addEventListener('change', calcularTroco);

---

# Parte 21 — Ajustar o submit do formulário

Antes, o código pegava o nome assim:

    const nome = document.getElementById('nome').value;

Agora o campo mudou para aluno:

    const nome = document.getElementById('aluno').value;

O produto continua com o mesmo id:

    const produto = document.getElementById('produto').value;

Também vamos pegar o valor pago e o troco:

    const valorPago = document.getElementById('valor-pago').value;
    const troco = document.getElementById('troco').value;

Por enquanto, a tabela continua com as mesmas 7 colunas:

- ID;
- Data;
- Nome;
- Produto;
- Quantidade;
- Preço;
- Total.

Então o valor pago e o troco aparecem no formulário, mas ainda não vão para a tabela.

---

# Parte 22 — Código atualizado do submit

Atualize o submit para ficar assim:

    const formulario = document.getElementById('form-venda');

    formulario.addEventListener('submit', function(event) {
        event.preventDefault();

        const data = document.getElementById('data').value;
        const nome = document.getElementById('aluno').value;
        const produto = document.getElementById('produto').value;
        const quantidade = document.getElementById('quantidade').value;
        const preco = document.getElementById('preco').value;
        const valorPago = document.getElementById('valor-pago').value;
        const troco = document.getElementById('troco').value;

        const total = (quantidade * preco).toFixed(2);

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

# Parte 23 — Validar se o valor pago é suficiente

Antes de salvar, podemos verificar se o valor pago é menor que o total.

Dentro do submit, depois de calcular o total, adicione:

    if (Number(valorPago) < Number(total)) {
        alert('O valor pago é menor que o total da compra.');
        return;
    }

O trecho ficará assim:

    const total = (quantidade * preco).toFixed(2);

    if (Number(valorPago) < Number(total)) {
        alert('O valor pago é menor que o total da compra.');
        return;
    }

---

# Parte 24 — Atualizar a tabela para mostrar valor pago e troco

Agora vamos melhorar a tabela.

No `index.html`, adicione duas novas colunas no cabeçalho:

    <th>Valor pago</th>
    <th>Troco</th>

A tabela ficará assim:

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
                <th>Valor pago</th>
                <th>Troco</th>
            </tr>
        </thead>
        <tbody></tbody>
    </table>

---

# Parte 25 — Salvar valor pago e troco na venda

Agora altere o array `novaVenda`.

Antes estava assim:

    const novaVenda = [
        novoId,
        data,
        nome,
        produto,
        quantidade,
        preco,
        total
    ];

Agora ficará assim:

    const novaVenda = [
        novoId,
        data,
        nome,
        produto,
        quantidade,
        preco,
        total,
        valorPago,
        troco
    ];

---

# Parte 26 — Problema possível com dados antigos

Os dados antigos do CSV têm 7 colunas.

As vendas novas terão 9 colunas.

Isso pode acontecer porque estamos evoluindo o sistema.

Para resolver, podemos apagar o `localStorage` e carregar tudo de novo.

No console do navegador, execute:

    localStorage.removeItem('dadosLanchonete');

Depois atualize a página.

---

# Parte 27 — Código completo das novas funções

As novas funções principais desta aula são:

    function carregarAlunosIniciais() {
        if (localStorage.getItem('alunosLanchonete')) {
            return;
        }

        const alunos = [
            'Ana',
            'Bruno',
            'Carla',
            'Daniel',
            'Eduarda'
        ];

        localStorage.setItem('alunosLanchonete', JSON.stringify(alunos));
    }

    function carregarProdutosIniciais() {
        if (localStorage.getItem('produtosLanchonete')) {
            return;
        }

        const produtos = [
            {
                nome: 'Coxinha',
                preco: 6.00
            },
            {
                nome: 'Suco',
                preco: 8.00
            },
            {
                nome: 'Pão de queijo',
                preco: 4.00
            },
            {
                nome: 'Refrigerante',
                preco: 7.00
            },
            {
                nome: 'Sanduíche',
                preco: 15.00
            }
        ];

        localStorage.setItem('produtosLanchonete', JSON.stringify(produtos));
    }

    function popularSelectAlunos() {
        const alunosSalvos = localStorage.getItem('alunosLanchonete');
        const alunos = JSON.parse(alunosSalvos);

        const selectAluno = document.getElementById('aluno');

        alunos.forEach(aluno => {
            const option = document.createElement('option');
            option.value = aluno;
            option.textContent = aluno;

            selectAluno.appendChild(option);
        });
    }

    function popularSelectProdutos() {
        const produtosSalvos = localStorage.getItem('produtosLanchonete');
        const produtos = JSON.parse(produtosSalvos);

        const selectProduto = document.getElementById('produto');

        produtos.forEach(produto => {
            const option = document.createElement('option');
            option.value = produto.nome;
            option.textContent = produto.nome;

            selectProduto.appendChild(option);
        });
    }

    function calcularTroco() {
        const quantidade = Number(document.getElementById('quantidade').value);
        const preco = Number(document.getElementById('preco').value);
        const valorPago = Number(document.getElementById('valor-pago').value);

        const total = quantidade * preco;
        const troco = valorPago - total;

        if (valorPago > 0) {
            document.getElementById('troco').value = troco.toFixed(2);
        }
    }

---

# Parte 28 — Organização do início do JavaScript

No final do arquivo, o fluxo inicial deve chamar:

    carregarAlunosIniciais();
    carregarProdutosIniciais();

    popularSelectAlunos();
    popularSelectProdutos();

    if (localStorage.getItem('dadosLanchonete')) {
        carregarTabela();
    } else {
        carregarDadosIniciais();
    }

---

# Parte 29 — Testes da Aula 04

Faça os seguintes testes:

1. abra a página no Live Server;
2. veja se o select de alunos aparece preenchido;
3. veja se o select de produtos aparece preenchido;
4. escolha um produto;
5. confira se o preço aparece automaticamente;
6. informe uma quantidade;
7. informe o valor pago;
8. veja se o troco é calculado;
9. clique em `Adicionar venda`;
10. veja se a venda aparece na tabela;
11. atualize a página;
12. veja se a venda continua salva.

---

# Parte 30 — Desafio 1: cadastrar novo aluno

Crie um segundo formulário para cadastrar aluno.

Exemplo:

    <form id="form-aluno">
        <input type="text" id="novo-aluno">
        <button type="submit">Cadastrar aluno</button>
    </form>

Quando o usuário cadastrar um aluno:

1. buscar o array `alunosLanchonete`;
2. adicionar o novo aluno;
3. salvar novamente no `localStorage`;
4. atualizar o select.

---

# Parte 31 — Desafio 2: cadastrar novo produto

Crie um formulário para cadastrar produto.

Campos:

- nome do produto;
- preço.

Quando cadastrar:

1. buscar o array `produtosLanchonete`;
2. adicionar um novo objeto;
3. salvar no `localStorage`;
4. atualizar o select.

Exemplo de objeto:

    {
        nome: 'Pastel',
        preco: 9.00
    }

---

# Parte 32 — Desafio 3: transformar produtos em botões

Depois que o select estiver funcionando, tente criar botões para os produtos.

Exemplo visual:

    Coxinha
    Suco
    Pão de queijo
    Refrigerante
    Sanduíche

Cada botão deve:

1. escolher o produto;
2. preencher o campo de produto;
3. preencher o preço;
4. calcular o troco novamente.

Essa solução é mais parecida com sistemas de caixa reais.

---

# Parte 33 — Diferença entre sistema didático e sistema real

O que estamos criando é um sistema didático.

Ele ajuda a entender:

- HTML;
- formulário;
- select;
- eventos;
- arrays;
- objetos;
- `localStorage`;
- cálculo;
- atualização da tela.

Em um sistema real, os dados normalmente seriam salvos em:

- banco de dados;
- servidor;
- API;
- sistema de autenticação;
- controle de usuários;
- relatórios.

Mas a lógica inicial é parecida:

    usuário informa dados
    sistema valida
    sistema calcula
    sistema salva
    sistema mostra o resultado

---

# Resumo da Aula 04

Nesta aula, aprendemos:

- por que usar select no lugar de input text;
- como salvar lista de alunos no localStorage;
- como salvar lista de produtos no localStorage;
- como popular um select com JavaScript;
- como usar objetos para representar produtos;
- como preencher o preço automaticamente;
- como calcular total;
- como receber valor pago;
- como calcular troco;
- como salvar vendas com mais informações.

---

# Próximo passo possível

Na próxima aula, podemos evoluir para uma destas opções:

1. criar cadastro de alunos;
2. criar cadastro de produtos;
3. transformar produtos em botões;
4. adicionar CSS;
5. criar relatório de vendas;
6. filtrar vendas por aluno;
7. filtrar vendas por produto;
8. exportar os dados para CSV.
