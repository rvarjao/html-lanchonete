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
                const configColuna = config[i];
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