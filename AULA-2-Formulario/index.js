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
