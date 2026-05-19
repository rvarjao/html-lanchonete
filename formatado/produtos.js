const PLANILHA_ID = '1gejWgPMF3F2fTyomRFisYYOtsTyK7yty37PBvaZG0_Q';
const PLANILHA_PRODUTOS_GID = '660715285';
const CALLBACK_PRODUTOS = 'receberProdutosGoogle';

function formatarCabecalho(cabecalho) {
    return cabecalho
        .replace(/_/g, ' ')
        .replace(/\b\w/g, letra => letra.toUpperCase());
}

function formatarValor(valor, cabecalho) {
    if (valor === null || valor === undefined) {
        return '';
    }

    valor = String(valor);
    const chave = cabecalho.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
    const numero = Number(valor.replace(',', '.'));

    if ((chave.includes('preco') || chave.includes('valor')) && !Number.isNaN(numero)) {
        return numero.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    }

    return valor;
}

function transformarRespostaGoogle(resposta) {
    const colunas = resposta.table.cols
        .map((coluna, index) => coluna.label || coluna.id || `Coluna ${index + 1}`)
        .filter(cabecalho => cabecalho !== '');

    const produtos = resposta.table.rows
        .map(linha => {
            return colunas.map((_, index) => {
                const celula = linha.c?.[index];

                if (!celula) {
                    return '';
                }

                return celula.f || celula.v || '';
            });
        })
        .filter(produto => produto.some(valor => valor !== ''));

    return [colunas, ...produtos];
}

function renderizarProdutos(linhas) {
    const [cabecalhos, ...produtos] = linhas;
    const cabecalhoTabela = document.getElementById('cabecalho-produtos');
    const corpoTabela = document.getElementById('tabela-produtos');
    const status = document.getElementById('status');

    cabecalhoTabela.innerHTML = '';
    corpoTabela.innerHTML = '';

    cabecalhos.forEach(cabecalho => {
        const th = document.createElement('th');
        th.textContent = formatarCabecalho(cabecalho);
        cabecalhoTabela.appendChild(th);
    });

    produtos.forEach(produto => {
        const tr = document.createElement('tr');

        cabecalhos.forEach((cabecalho, index) => {
            const td = document.createElement('td');
            td.textContent = formatarValor(produto[index] || '', cabecalho);
            tr.appendChild(td);
        });

        corpoTabela.appendChild(tr);
    });

    status.textContent = `${produtos.length} produto(s) carregado(s).`;
}

function exibirErroProdutos(error) {
    document.getElementById('status').textContent = 'Nao foi possivel carregar os produtos.';
    console.error('Erro ao carregar produtos:', error);
}

function receberProdutosGoogle(resposta) {
    if (!resposta || resposta.status === 'error') {
        exibirErroProdutos(resposta);
        return;
    }

    const linhas = transformarRespostaGoogle(resposta);

    if (linhas.length < 2) {
        exibirErroProdutos(new Error('A planilha nao possui produtos para exibir.'));
        return;
    }

    renderizarProdutos(linhas);
}

function carregarProdutos() {
    const script = document.createElement('script');
    const parametros = new URLSearchParams({
        gid: PLANILHA_PRODUTOS_GID,
        tqx: `out:json;responseHandler:${CALLBACK_PRODUTOS}`,
    });

    window[CALLBACK_PRODUTOS] = receberProdutosGoogle;
    script.src = `https://docs.google.com/spreadsheets/d/${PLANILHA_ID}/gviz/tq?${parametros.toString()}`;
    script.onerror = () => exibirErroProdutos(new Error('Falha ao acessar a planilha.'));
    document.body.appendChild(script);
}

carregarProdutos();
