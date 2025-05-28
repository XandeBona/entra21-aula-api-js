let listaEnderecoPrincipal = [];

function validarDuplicados() {
    
}

function salvarEnderecoNaTabela(endereco) {
    const novaLinha = document.createElement('tr');
    const tabelaCep = document.createElement('td');
    const tabelaRua = document.createElement('td');
    const tabelaNumero = document.createElement('td');
    const tabelaBairro = document.createElement('td');
    const tabelaCidade = document.createElement('td');
    const tabelaEstado = document.createElement('td');

    tabelaCep.innerText = endereco.cep;
    tabelaRua.innerText = endereco.rua;
    tabelaNumero.innerText = endereco.numero;
    tabelaBairro.innerText = endereco.bairro;
    tabelaCidade.innerText = endereco.cidade;
    tabelaEstado.innerText = endereco.estado;

    novaLinha.appendChild(tabelaCep);
    novaLinha.appendChild(tabelaRua);
    novaLinha.appendChild(tabelaNumero);
    novaLinha.appendChild(tabelaBairro);
    novaLinha.appendChild(tabelaCidade);
    novaLinha.appendChild(tabelaEstado);

    const adicionaNaTabela = document.getElementById("div_tabela");
    adicionaNaTabela.appendChild(novaLinha);
}

function salvarEndereco() {
    const inputCep = document.getElementById("input_cep");
    const inputRua = document.getElementById("input_rua");
    const inputNumero = document.getElementById("input_numero");
    const inputBairro = document.getElementById("input_bairro");
    const inputCidade = document.getElementById("input_cidade");
    const inputEstado = document.getElementById("input_estado");

    const novoEndereco = {
        cep: inputCep.value,
        rua: inputRua.value,
        numero: inputNumero.value,
        bairro: inputBairro.value,
        cidade: inputCidade.value,
        estado: inputEstado.value
    }

    salvarEnderecoNaTabela(novoEndereco);

    listaEnderecoPrincipal.push(novoEndereco);

}

function buscarCep() {
    const inputCep = document.getElementById("input_cep");
    const valorCep = inputCep.value;
    fetch("https://brasilapi.com.br/api/cep/v2/" + valorCep)
        .then((resposta) => {
            return resposta.json();
        })
        .then((json) => {
            const inputRua = document.getElementById("input_rua");
            inputRua.value = json.street;
            const inputBairro = document.getElementById("input_bairro");
            inputBairro.value = json.neighborhood;
            const inputCidade = document.getElementById("input_cidade");
            inputCidade.value = json.city;
            const inputEstado = document.getElementById("input_estado");
            inputEstado.value = json.state;
        });
}

function configurarEventos() {
    const inputCep = document.getElementById("input_cep");
    inputCep.addEventListener("focusout", buscarCep);
    const botaoSalvar = document.getElementById("botao_salvar");
    botaoSalvar.addEventListener("click", salvarEndereco);
}

window.addEventListener("load", configurarEventos);