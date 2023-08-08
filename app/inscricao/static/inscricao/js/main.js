window.onload = function () {
    formatarTelefone("input", "id_fone_1");
    formatarTelefone("input", "id_fone_2");
    formatarTelefone("input", "id_fone_3");

    atualizarBotaoContato("id_fone_1", "btn_id_fone_1");
    atualizarBotaoContato("id_fone_2", "btn_id_fone_2");
    atualizarBotaoContato("id_fone_3", "btn_id_fone_3");

    AbrirConjuge()
    configurarCampoDocumento()
};


$(document).ready(function () {
    $('#id_tipo_de_documento').on('change', configurarCampoDocumento);
});

function configurarCampoDocumento() {
    let tipo_titular = document.getElementById('id_tipo_de_documento');
    let documento_titular = document.getElementById('id_documento_titular');
    let texto_documento_titular = document.getElementById('texto_documento_titular')
    let titular_conta = document.getElementById('id_nome_razao_titular')
    let titular_conta_label = document.getElementById('texto_nomerazao_titular')


    if (tipo_titular.value) {
        documento_titular.disabled = false;
        titular_conta.disabled = false;

        if (tipo_titular.value.substr(0, 1) === '1') { // CNPJ
            documento_titular.classList.add('cnpj-cpf');
            documento_titular.placeholder = '00.000.000/0000-00';
            texto_documento_titular.innerHTML = 'CNPJ'
            titular_conta_label.innerHTML = 'Titular Razão Social'
            document.getElementById('id_documento_titular').addEventListener('keyup', validarCNPJ_titular);
            document.getElementById('cnpjlog_titular').innerHTML = 'CNPJ Invalido'

        } else if (tipo_titular.value.substr(0, 1) === '0') { // CPF
            documento_titular.classList.add('cnpj-cpf');
            documento_titular.placeholder = '000.000.000-00';
            texto_documento_titular.innerHTML = 'CPF'
            titular_conta_label.innerHTML = 'Titular Nome Completo'
            document.getElementById('id_documento_titular').addEventListener('keyup', ValidaCPF_titular);
            document.getElementById('cnpjlog_titular').innerHTML = 'CPF Invalido'

        } else { // não é nem CNPJ nem CPF
            documento_titular.classList.remove('cnpj-cpf');
            documento_titular.placeholder = '';
            texto_documento_titular.innerHTML = 'CPF/CNPJ'
            titular_conta_label.innerHTML = 'Nome Completo/Razão Social'
            document.getElementById('id_documento_titular').addEventListener('keyup', function () { });
            document.getElementById('cnpjlog_titular').innerHTML = ''

        }
    } else {
        documento_titular.disabled = true;
        titular_conta.disabled = true;
        documento_titular.value = '';
        documento_titular.classList.remove('cnpj-cpf');
        documento_titular.placeholder = '';
        texto_documento_titular.innerHTML = 'CPF/CNPJ'

        titular_conta_label.innerHTML = 'Nome Completo/Razão Social'
        titular_conta.value = '';

        document.getElementById('cnpjlog_titular').innerHTML = ''
    }

    // Adicione este trecho de código para aplicar a máscara quando o campo já estiver preenchido
    $('.cnpj-cpf').each(function () {
        var tipo = $('#id_tipo_de_documento').val().substr(0, 1);
        var mascara = '';
        if (tipo === '1') {
            mascara = '00.000.000/0000-00';
        } else if (tipo === '0') {
            mascara = '000.000.000-00';
        }
        $(this).mask(mascara);
    });
}



function carregarCNPJ(cnpj) {
    let v_cnpj = cnpj.replace(/[^0-9]/g, '')
    let v_url = 'https://www.receitaws.com.br/v1/cnpj/' + v_cnpj
    const alertPlaceholder = document.getElementById('liveAlertPlaceholder')
    const alert = (message, type) => {
        const wrapper = document.createElement('div')
        wrapper.innerHTML = [
            `<div class="alert alert-${type} alert-dismissible" role="alert">`,
            `   <div>${message}</div>`,
            '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
            '</div>'
        ].join('')
        alertPlaceholder.append(wrapper)
    }

    try {
        if (v_cnpj.length == 14 && validarCNPJ(v_cnpj)) {
            $.ajax({
                url: v_url,
                dataType: 'jsonp',
                crossDomain: true,
                success: function (response) {
                    if (response.status === "OK") {
                        if (response.nome != '') {
                            document.getElementById('id_pessoa_juridica').value = response.nome
                        }
                        if (response.fantasia != '') {
                            document.getElementById('id_nome_fantasia').value = response.fantasia
                        }
                        if (response.cep != '') {
                            document.getElementById('id_cep').value = response.cep
                        }
                        if (response.uf != '') {
                            document.getElementById('id_estado').value = response.uf
                        }
                        if (response.municipio != '') {
                            document.getElementById('id_cidade').value = response.municipio
                        }
                        if (response.bairro != '') {
                            document.getElementById('id_bairro').value = response.bairro
                        }
                        if (response.logradouro != '') {
                            document.getElementById('id_endereco').value = response.logradouro
                        }
                        if (response.numero != '') {
                            document.getElementById('id_numero').value = response.numero
                        }
                        if (response.situacao != '') {
                            document.getElementById('id_cnpj_situacao').value = response.situacao
                        }
                        if (response.porte != '') {
                            document.getElementById('id_cnpj_porte').value = response.porte
                        }
                        if (response.abertura != '') {
                            let dataOriginal = response.abertura
                            let partesData = dataOriginal.split("/");
                            let dataNova = new Date(partesData[2], partesData[1] - 1, partesData[0]);
                            let novaStringData = dataNova.toISOString().slice(0, 10);
                            document.getElementById('id_cnpj_data_abertura').value = novaStringData
                        }
                        if (response.tipo != '') {
                            document.getElementById('id_cnpj_tipo').value = response.tipo
                        }
                        if (response.atividade_principal.length > 0) {
                            let dados_web = response.atividade_principal;
                            let dados = '';
                            for (let i = 0; i < dados_web.length; i++) {
                                dados = dados_web[i].code + ' - ' + dados_web[i].text + '. '
                            }
                            document.getElementById('id_cnpj_atividade_principal').value = dados;
                        }
                        if (response.atividades_secundarias.length > 0) {
                            let dados_web = response.atividades_secundarias;
                            let dados = '';
                            for (let i = 0; i < dados_web.length; i++) {
                                dados = dados_web[i].code + ' - ' + dados_web[i].text + '. '
                            }
                            // document.getElementById('id_cnpj_atividade_principal').value = dados;
                        }
                    }
                    else {
                        alert('CNPJ não encontrado na base de dados', 'primary')
                    }
                },
                error: function (xhr, textStatus, error) {
                    if (xhr.status == 429) {
                        alert('Houve um erro ao receber os dados, aguarde 1 minuto e tente novamente.', 'primary')
                    } else {
                        alert(`${xhr.status} - Status: ${textStatus} - ${error}`, 'warning')
                    }
                }
            });
        } else {
            alert(`O CNPJ ${cnpj} é inválido!`, 'warning')
        }

    } catch {
        alert('Erro ao enviar dados', 'warning')
    }

}

// Abrir Conjuge
function AbrirConjuge() {
    try {
        const divConjuge = document.getElementById('div_conjuge')
        let estadoCivil = document.getElementById('id_estado_civil')
        teste = false
        if (estadoCivil.value == '1') {
            teste = true
        }
        if (estadoCivil.value == '4') {
            teste = true
        }
        if (teste) {
            divConjuge.classList.add("show");
        }
        else {
            divConjuge.classList.remove("show");
            document.getElementById('conjuge_nome').value = ''
            document.getElementById('conjuge_sobrenome').value = ''
        }
    }
    catch {
        return undefined
    }

}

// FORMATAR BOTAO TELEFONE
function atualizarBotaoContato(inputId, botaoId) {
    let fone = document.getElementById(inputId).value
    let foneTipo = parseInt(document.getElementById(inputId + "_tipo").value)
    let botao = document.getElementById(botaoId)

    if (foneTipo === 1) {
        botao.innerHTML = '<i class="bi bi-telephone-inbound"></i>';
        botao.href = "tel:" + fone.replace(/\D/g, '');
        botao.classList.remove("disabled");
        botao.classList.add("btn-outline-dark");
        botao.classList.remove("btn-outline-success");

    } else if (foneTipo === 2) {
        botao.innerHTML = '<i class="bi bi-whatsapp"></i>';
        botao.href = "https://wa.me/" + fone.replace(/\D/g, '');
        botao.classList.remove("disabled");
        botao.classList.remove("btn-outline-dark");
        botao.classList.add("btn-outline-success");

    } else if (foneTipo === 3) {
        botao.innerHTML = '<i class="bi bi-telegram"></i>';
        botao.href = "https://t.me/" + fone.replace(/\D/g, '');
        botao.classList.remove("disabled");
        botao.classList.add("btn-outline-dark");
        botao.classList.remove("btn-outline-success");

    } else {
        botao.innerHTML = '<i class="bi bi-dash"></i>';
        botao.classList.add("disabled");
        botao.classList.add("btn-outline-dark");
        botao.classList.remove("btn-outline-success");
    }
}


document.getElementById("id_fone_1_tipo").addEventListener("input", function () {
    atualizarBotaoContato("id_fone_1", "btn_id_fone_1");
});

document.getElementById("id_fone_2_tipo").addEventListener("input", function () {
    atualizarBotaoContato("id_fone_2", "btn_id_fone_2");
});

document.getElementById("id_fone_3_tipo").addEventListener("input", function () {
    atualizarBotaoContato("id_fone_3", "btn_id_fone_3");
});



// FORMATAR TELEFONE
function formatarTelefone(event, inputId) {
    var valor = document.getElementById(inputId).value;
    var retorno = valor.replace(/\D/g, "");
    retorno = retorno.replace(/^0/, "");
    if (retorno.length > 10) {
        retorno = retorno.replace(/^(\d\d)(\d{5})(\d{4}).*/, "($1) $2-$3");
    } else if (retorno.length > 5) {
        if (retorno.length === 6 && event.code === "Backspace") {
            // Necessário pois, senão o "-" fica sempre voltando ao dar backspace
            return;
        }
        retorno = retorno.replace(/^(\d\d)(\d{4})(\d{0,4}).*/, "($1) $2-$3");
    } else if (retorno.length > 2) {
        retorno = retorno.replace(/^(\d\d)(\d{0,5})/, "($1) $2");
    } else {
        if (retorno.length !== 0) {
            retorno = retorno.replace(/^(\d*)/, "($1");
        }
    }
    document.getElementById(inputId).value = retorno;
}

document.getElementById("id_fone_1").addEventListener("input", function (event) {
    formatarTelefone(event, "id_fone_1");
});

document.getElementById("id_fone_2").addEventListener("input", function (event) {
    formatarTelefone(event, "id_fone_2");
});

document.getElementById("id_fone_3").addEventListener("input", function (event) {
    formatarTelefone(event, "id_fone_3");
});






// Buscar CEP
function limpa_formulário_cep() {
    //Limpa valores do formulário de cep.
    document.getElementById('id_endereco').value = ("");
    document.getElementById('id_bairro').value = ("");
    document.getElementById('id_cidade').value = ("");
    document.getElementById('id_estado').value = ("");
    document.getElementById('ceplog').classList.remove('d-block')
}

function meu_callback(conteudo) {
    if (!("erro" in conteudo)) {
        //Atualiza os campos com os valores.
        document.getElementById('id_endereco').value = (conteudo.logradouro);
        document.getElementById('id_bairro').value = (conteudo.bairro);
        document.getElementById('id_cidade').value = (conteudo.localidade);
        document.getElementById('id_estado').value = (conteudo.uf);
        document.getElementById('ceplog').classList.remove('d-block')
    } //end if.
    else {
        //CEP não Encontrado.
        limpa_formulário_cep();
        //alert("CEP não encontrado.");
        document.getElementById('ceplog').classList.add('d-block')
    }
}


function pesquisacep(valor) {
    //Nova variável "cep" somente com dígitos.
    var cep = valor.replace(/\D/g, '');
    //Verifica se campo cep possui valor informado.
    if (cep != "") {
        //Expressão regular para validar o CEP.
        var validacep = /^[0-9]{8}$/;
        //Valida o formato do CEP.
        if (validacep.test(cep)) {
            //Preenche os campos com "..." enquanto consulta webservice.
            document.getElementById('id_endereco').value = "...";
            document.getElementById('id_bairro').value = "...";
            document.getElementById('id_cidade').value = "...";
            document.getElementById('id_estado').value = "...";
            //Cria um elemento javascript.
            var script = document.createElement('script');
            //Sincroniza com o callback.
            script.src = 'https://viacep.com.br/ws/' + cep + '/json/?callback=meu_callback';
            //Insere script no documento e carrega o conteúdo.
            document.body.appendChild(script);
        } //end if.
        else {
            //cep é inválido.
            limpa_formulário_cep();
            document.getElementById('ceplog').classList.add('d-block')
            // alert("Formato de CEP inválido.");
        }
    } //end if.
    else {
        //cep sem valor, limpa formulário.
        limpa_formulário_cep();
        document.getElementById('ceplog').classList.remove('d-block')
    }
};









