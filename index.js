function carregarDados() {
    fetch('dados.csv')
        .then(response => response.text())
        .then(data => {
            const linhas = data.split('\n');
            const tabela = document.getElementById('tabela-dados');

            linhas.forEach((linha, index) => {

                if (index === 0) {
                    const cabecalho = tabela.getElementsByTagName('thead')[0];
                    const tr = document.getElementsByTagName('tr')[0];
                    const ths = tr.getElementsByTagName('th');
                    config.forEach((coluna, i) => {
                        ths[i].textContent = coluna.label;
                        ths[i].style.textAlign = coluna.align || 'right';
                    });
                    return;
                }

                const colunas = linha.split(',');
                if (colunas.length < 7) {
                    return;
                }
                const novaLinha = document.createElement('tr');
                colunas.forEach((coluna, i) => {
                    const configColuna = config[i];
                    const valorFormatado = formatarValor(coluna, configColuna.type);
                    const celula = document.createElement('td');
                    celula.textContent = valorFormatado;
                    celula.style.textAlign = configColuna.align || 'right';
                    novaLinha.appendChild(celula).textContent = valorFormatado;
                });
                // const id = colunas[0];
                // const data = colunas[1];
                // const fmtData = new Date(data).toLocaleDateString('pt-BR');
                // const aluno = colunas[2];
                // const produto = colunas[3];
                // const quantidade = colunas[4];
                // const preco = colunas[5];
                // const fmtPreco = parseFloat(preco).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
                // const total = colunas[6];
                // const fmtTotal = parseFloat(total).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

                // novaLinha.appendChild(document.createElement('td')).textContent = id;
                // novaLinha.appendChild(document.createElement('td')).textContent = fmtData;
                // novaLinha.appendChild(document.createElement('td')).textContent = aluno;
                // novaLinha.appendChild(document.createElement('td')).textContent = produto;
                // novaLinha.appendChild(document.createElement('td')).textContent = quantidade;
                // novaLinha.appendChild(document.createElement('td')).textContent = fmtPreco;
                // novaLinha.appendChild(document.createElement('td')).textContent = fmtTotal;

                tabela.appendChild(novaLinha);
            });
            let totalGeral = 0;
            let totalQuantidade = 0;
            linhas.forEach((linha, index) => {
                if (index === 0) {
                    return;
                }
                const colunas = linha.split(',');
                if (colunas.length < 7) {
                    return;
                }
                const quantidade = formatarValor(colunas[4], 'float');
                const preco = formatarValor(colunas[5], 'float');
                const total = quantidade * preco;
                totalGeral += total;
                totalQuantidade += quantidade;
            });

            const tdTotalQuantidade = document.getElementById('totalQuantidade');
            const tdTotalGeral = document.getElementById('totalGeral');
            tdTotalQuantidade.textContent = totalQuantidade;
            tdTotalGeral.textContent = totalGeral.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
        })
        .catch(error => {
            console.error('Erro ao carregar os dados:', error);
        });
}

const config = [
    {
        key: 'id',
        label: 'ID',
        type: 'integer',
    },
    {
        key: 'data',
        label: 'Data',
        type: 'date',
    },
    {
        key: 'aluno',
        label: 'Aluno',
        type: 'string',
        align: 'left',
    },
    {
        key: 'produto',
        label: 'Produto',
        type: 'string',
        align: 'left',
    },
    {
        key: 'quantidade',
        label: 'Quantidade',
        type: 'integer',
    },
    {
        key: 'preco',
        label: 'Preço',
        type: 'currency',
    },
    {
        key: 'total',
        label: 'Total',
        type: 'currency',
    }
];

function formatarValor(valor, tipo) {
    switch (tipo) {
        case 'date':
            return new Date(valor).toLocaleDateString('pt-BR');
        case 'integer':
            return parseInt(valor, 10);
        case 'float':
            return parseFloat(valor);
        case 'currency':
            return parseFloat(valor).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
        default:
            return valor;
    }
}

carregarDados();
