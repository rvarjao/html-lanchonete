function adicionarProduto() {
    const id = document.getElementById('produtoId').value;
    const nome = document.getElementById('produtoNome').value;
    const preco = document.getElementById('produtoPreco').value;

    if (!id || !nome || !preco) {
        alert('Por favor, preencha todos os campos.');
        return;
    }

    const novaLinha = `${id},${nome},${preco}\n`;
    let dadosExistentes = localStorage.getItem('produtos') || '';
    dadosExistentes += novaLinha;
    localStorage.setItem('produtos', dadosExistentes);
    alert('Produto salvo com sucesso!');
}

function carregarProdutos() {
    const dados = localStorage.getItem('produtos');
    if (!dados) {
        console.warn('Nenhum dado encontrado no localStorage para a chave "produtos".');
        return;
    }
    console.log(dados);
    return dados.split('\n');
}

function preencherTabela(linhas) {

    let totalGeral = 0;
    let totalQuantidade = 0;

    linhas.forEach(linha => {
        if (linha.trim() === '') {
            return;
        }
        const colunas = linha.split(',');
        if (colunas.length < 3) {
            return;
        }
        const id = colunas[0];
        const nome = colunas[1];
        const preco = colunas[2];
        const fmtPreco = parseFloat(preco).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

        const tabela = document.getElementById('tabelaProdutos');
        const novaLinha = document.createElement('tr');
        novaLinha.appendChild(document.createElement('td')).textContent = id;
        novaLinha.appendChild(document.createElement('td')).textContent = nome;
        novaLinha.appendChild(document.createElement('td')).textContent = fmtPreco;

        tabela.appendChild(novaLinha);
        totalGeral += parseFloat(preco);
        totalQuantidade++;
    });
}

const produtos = carregarProdutos();
preencherTabela(produtos);
