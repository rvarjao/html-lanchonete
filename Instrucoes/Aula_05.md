# Aula 05 — Continuação das Aulas 04 — Checkbox e informações adicionais

## Objetivo da aula

Na aula anterior, aprendemos:

* usar `select`;
* preencher um campo automaticamente;
* calcular valores usando JavaScript.

Agora vamos continuar o sistema da lanchonete adicionando:

* `checkbox`;
* informações adicionais do pedido;
* leitura de múltiplas opções marcadas.

---

# O que é checkbox?

O `checkbox` é um campo usado quando o usuário pode marcar:

* nenhuma opção;
* uma opção;
* várias opções ao mesmo tempo.

Exemplo:

```text id="j6s74y"
[x] Pago
[x] Para viagem
[ ] Pedido urgente
[ ] Entregue
```

Diferente do `select` e do `radio`, o `checkbox` permite múltiplas escolhas.

---

# Parte 1 — Continuar o projeto da Aula 03

Vamos continuar usando os arquivos:

```text id="stj4z5"
index.html
index.js
```

---

# Parte 2 — Adicionar os checkboxes no HTML

No `index.html`, abaixo do campo `total`, adicione:

```html id="g0osx6"
<h3>Informações adicionais</h3>

<label>
    <input type="checkbox" value="Pago" class="info-adicional">
    Pago
</label>

<br>

<label>
    <input type="checkbox" value="Entregue" class="info-adicional">
    Entregue
</label>

<br>

<label>
    <input type="checkbox" value="Para viagem" class="info-adicional">
    Para viagem
</label>

<br>

<label>
    <input type="checkbox" value="Pedido urgente" class="info-adicional">
    Pedido urgente
</label>
```

---

# Parte 3 — Entender o HTML

Cada checkbox tem:

```html id="plz4tw"
<input type="checkbox">
```

O tipo `checkbox` cria uma caixa de marcação.

Também usamos:

```html id="cvgpof"
value="Pago"
```

Esse valor será usado pelo JavaScript.

Também usamos:

```html id="lkj1to"
class="info-adicional"
```

Isso permite que o JavaScript encontre todos os checkboxes do grupo.

---

# Parte 4 — Testar os checkboxes

Abra o projeto no navegador.

Agora você deve conseguir:

* marcar uma opção;
* marcar várias;
* desmarcar;
* deixar todas vazias.

---

# Parte 5 — Pegar os checkboxes no JavaScript

No `index.js`, abaixo das outras variáveis, adicione:

```javascript id="ynvbyk"
const checkboxesInfo = document.querySelectorAll('.info-adicional');
```

---

# Parte 6 — Entender o querySelectorAll

Antes usamos:

```javascript id="t14eqs"
document.getElementById(...)
```

Agora usamos:

```javascript id="3j9lzl"
document.querySelectorAll('.info-adicional')
```

O ponto (`.`) significa classe CSS.

Esse comando pega todos os elementos que possuem:

```html id="4n17ui"
class="info-adicional"
```

---

# Parte 7 — Criar um array para guardar as opções marcadas

Agora vamos criar uma função.

No `index.js`, adicione:

```javascript id="12yckv"
function pegarInformacoesAdicionais() {
    const informacoes = [];

    checkboxesInfo.forEach(function(checkbox) {
        if (checkbox.checked) {
            informacoes.push(checkbox.value);
        }
    });

    return informacoes;
}
```

---

# Parte 8 — Entender a função

Criamos um array vazio:

```javascript id="h0sn1u"
const informacoes = [];
```

Depois percorremos todos os checkboxes:

```javascript id="zvjlwm"
checkboxesInfo.forEach(function(checkbox) {
```

Verificamos se ele está marcado:

```javascript id="3xj1go"
if (checkbox.checked)
```

Se estiver marcado, adicionamos o valor no array:

```javascript id="5mgb14"
informacoes.push(checkbox.value);
```

---

# Parte 9 — Testar no console

Agora vamos testar.

No evento do botão ou no final do arquivo, adicione:

```javascript id="7v0s0t"
console.log(pegarInformacoesAdicionais());
```

Teste marcando diferentes opções.

Exemplo esperado:

```text id="fjbhdi"
["Pago", "Para viagem"]
```

Ou:

```text id="tuxsy5"
["Pedido urgente"]
```

---

# Parte 10 — Mostrar as informações na tela

Agora vamos mostrar as informações escolhidas na página.

No HTML, abaixo dos checkboxes, adicione:

```html id="4z2zjr"
<p id="resultado-info"></p>
```

---

# Parte 11 — Criar uma função para atualizar o resultado

No `index.js`, adicione:

```javascript id="6dgrkl"
function atualizarInformacoes() {
    const informacoes = pegarInformacoesAdicionais();

    const resultado = document.getElementById('resultado-info');

    resultado.textContent = informacoes.join(', ');
}
```

---

# Parte 12 — Entender o join

O método:

```javascript id="8jnyaf"
join(', ')
```

transforma um array em texto.

Exemplo:

```javascript id="pb6vr9"
["Pago", "Para viagem"]
```

vira:

```text id="g7cb1n"
Pago, Para viagem
```

---

# Parte 13 — Atualizar automaticamente

Agora queremos atualizar o texto sempre que o usuário marcar ou desmarcar um checkbox.

Adicione:

```javascript id="4y7czr"
checkboxesInfo.forEach(function(checkbox) {
    checkbox.addEventListener('change', function() {
        atualizarInformacoes();
    });
});
```

---

# Parte 14 — Testar

Agora faça os testes:

1. marque `Pago`;
2. veja se aparece:

   ```text id="cgj8b1"
   Pago
   ```
3. marque `Para viagem`;
4. veja se aparece:

   ```text id="yql92p"
   Pago, Para viagem
   ```
5. desmarque `Pago`;
6. veja se sobra apenas:

   ```text id="jlwmfx"
   Para viagem
   ```

---

# Parte 15 — Código completo do JavaScript

O trecho principal desta aula fica assim:

```javascript id="jlwmfx"
const checkboxesInfo = document.querySelectorAll('.info-adicional');

function pegarInformacoesAdicionais() {
    const informacoes = [];

    checkboxesInfo.forEach(function(checkbox) {
        if (checkbox.checked) {
            informacoes.push(checkbox.value);
        }
    });

    return informacoes;
}

function atualizarInformacoes() {
    const informacoes = pegarInformacoesAdicionais();

    const resultado = document.getElementById('resultado-info');

    resultado.textContent = informacoes.join(', ');
}

checkboxesInfo.forEach(function(checkbox) {
    checkbox.addEventListener('change', function() {
        atualizarInformacoes();
    });
});
```

---

# Parte 16 — O que aprendemos nesta aula

Nesta aula, aprendemos:

* usar `checkbox`;
* entender múltiplas escolhas;
* usar `querySelectorAll`;
* usar classes no HTML;
* percorrer elementos com `forEach`;
* verificar se um checkbox está marcado;
* criar arrays;
* usar `push`;
* transformar array em texto com `join`;
* atualizar a tela automaticamente.

---

# Diferença entre select, radio e checkbox

## Select

```text id="svf8n4"
Escolhe uma opção em uma lista.
```

## Radio

```text id="8c1m8j"
Escolhe apenas UMA opção visível.
```

## Checkbox

```text id="vr2lb7"
Pode marcar várias opções ao mesmo tempo.
```

---

# Desafio 1

Adicione novos checkboxes:

```text id="5y8b5d"
Cliente VIP
Com desconto
Pedido cancelado
```

---

# Desafio 2

Faça uma validação:

Se o usuário marcar:

```text id="jjlwmv"
Entregue
```

mas NÃO marcar:

```text id="ngsxx3"
Pago
```

mostrar um alerta:

```text id="1e1yeb"
Pedido entregue mas ainda não está pago.
```

---

# Desafio 3

Tente salvar as informações adicionais dentro de um array da venda.

Exemplo:

```javascript id="a2dq0o"
const venda = {
    produto: 'Coxinha',
    preco: 6,
    informacoes: ['Pago', 'Para viagem']
};
```

Isso é parecido com sistemas reais.
