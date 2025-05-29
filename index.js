let listaEnderecoPrincipal = [];

//Função para validar se o endereço já foi cadastrado
function validarDuplicados(novoEndereco) {
    return listaEnderecoPrincipal.some(endereco =>
        endereco.cep === novoEndereco.cep &&
        endereco.rua === novoEndereco.rua &&
        endereco.bairro === novoEndereco.bairro &&
        endereco.cidade === novoEndereco.cidade &&
        endereco.estado === novoEndereco.estado &&
        endereco.numero === novoEndereco.numero
    );
}

//Função para salvar os dados na tabela
function salvarEnderecoNaTabela(endereco) {
    //Cria a linha
    const novaLinha = document.createElement('tr');
    //Cria as células (colunas)
    const tabelaCep = document.createElement('td');
    const tabelaRua = document.createElement('td');
    const tabelaNumero = document.createElement('td');
    const tabelaBairro = document.createElement('td');
    const tabelaCidade = document.createElement('td');
    const tabelaEstado = document.createElement('td');

    //Faz com que as células puxem as informações do objeto
    tabelaCep.innerText = endereco.cep;
    tabelaRua.innerText = endereco.rua;
    tabelaNumero.innerText = endereco.numero;
    tabelaBairro.innerText = endereco.bairro;
    tabelaCidade.innerText = endereco.cidade;
    tabelaEstado.innerText = endereco.estado;

    //Faz com que a linha criada puxe as células com as informações
    novaLinha.appendChild(tabelaCep);
    novaLinha.appendChild(tabelaRua);
    novaLinha.appendChild(tabelaNumero);
    novaLinha.appendChild(tabelaBairro);
    novaLinha.appendChild(tabelaCidade);
    novaLinha.appendChild(tabelaEstado);

    //Faz com que a linha que contém as células com informações seja adicionada na tabela
    const adicionaNaTabela = document.getElementById("tabela_endereco");
    adicionaNaTabela.appendChild(novaLinha);
}

//Função para salvar o endereço
function salvarEndereco() {
    const inputCep = document.getElementById("input_cep");
    const inputRua = document.getElementById("input_rua");
    const inputNumero = document.getElementById("input_numero");
    const inputBairro = document.getElementById("input_bairro");
    const inputCidade = document.getElementById("input_cidade");
    const inputEstado = document.getElementById("input_estado");

    //Valida se todos os inputs foram preenchidos
    if (!inputCep.value || !inputCep.value || !inputNumero.value || !inputBairro.value || !inputCidade.value || !inputEstado.value) {
        alert("Por favor, preencha todos os campos obrigatórios!");
        return;
    }

    //Valida se o CEP é valido
    const cep = parseInt(inputCep.value);
    const cepRegex = /^\d{8}$/;
    if(isNaN(cep) || (!cepRegex.test(cep))) {
        alert("Favor informar um CEP válido!")
        return;
    }
    
    //Valida se o número do endereço é um número e não é negativo
    const numero = parseInt(inputNumero.value);
    if (isNaN(numero) || numero < 0) {
        alert("O número para o endereço é inválido!");
        return;
    }

    //Cria um novo objeto
    const novoEndereco = {
        cep: cep,
        rua: inputRua.value,
        numero: numero,
        bairro: inputBairro.value,
        cidade: inputCidade.value,
        estado: inputEstado.value
    };

    //Puxa a função que valida se o endereço já foi cadastrado anteriormente
    if (validarDuplicados(novoEndereco)) {
        alert("Esse endereço já foi cadastrado!");
        return;
    };

    //Puxa a função para salvar os dados na tabela
    salvarEnderecoNaTabela(novoEndereco);

    //Adiciona o objeto ao final do array
    listaEnderecoPrincipal.push(novoEndereco);
    localStorage.setItem("tabela_endereco", JSON.stringify(listaEnderecoPrincipal));

}

//Função para carregar os endereços que foram salvos anteriormente no localStorage ao abrir a página
function carregarEnderecos() {
    const storage = JSON.parse(localStorage.getItem("tabela_endereco"));
    listaEnderecoPrincipal = storage ? storage : [];

    for (let endereco of listaEnderecoPrincipal) {
        cep = endereco.cep;
        rua = endereco.rua;
        numero = endereco.numero;
        bairro = endereco.bairro;
        cidade = endereco.cidade;
        estado = endereco.estado;
        salvarEnderecoNaTabela(endereco);
    }

}

//Busca a API
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

//Inicializa os eventos quando a página for carregada
function configurarEventos() {
    carregarEnderecos();
    const inputCep = document.getElementById("input_cep");
    inputCep.addEventListener("focusout", buscarCep);
    const botaoSalvar = document.getElementById("botao_salvar");
    botaoSalvar.addEventListener("click", salvarEndereco);
}

window.addEventListener("load", configurarEventos);