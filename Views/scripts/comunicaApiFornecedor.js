$(document).ready(function() {

    function limpa_formulário_cep() {
        // Limpa valores do formulário de cep.
        $("#ruaInput").val("");
        $("#bairroInput").val("");
        $("#cidadeInput").val("");
        $("#ufInput").val("");
        $("#ibgeInput").val("");
    }
    
    //Quando o campo cep perde o foco.
    $("#cepInput").blur(function() {

        //Nova variável "cep" somente com dígitos.
        var cep = $(this).val().replace(/\D/g, '');

        //Verifica se campo cep possui valor informado.
        if (cep != "") {

            //Expressão regular para validar o CEP.
            var validacep = /^[0-9]{8}$/;

            //Valida o formato do CEP.
            if(validacep.test(cep)) {

                //Preenche os campos com "..." enquanto consulta webservice.
                $("#ruaInput").val("...");
                $("#bairroInput").val("...");
                $("#cidadeInput").val("...");
                $("#ufInput").val("...");
                $("#ibgeInput").val("...");

                //Consulta o webservice viacep.com.br/
                $.getJSON("https://viacep.com.br/ws/"+ cep +"/json/?callback=?", function(dados) {

                    if (!("erro" in dados)) {
                        //Atualiza os campos com os valores da consulta.
                        $("#ruaInput").val(dados.logradouro);
                        $("#bairroInput").val(dados.bairro);
                        $("#cidadeInput").val(dados.localidade);
                        $("#ufInput").val(dados.uf);
                        $("#ibgeInput").val(dados.ibge);
                    } //end if.
                    else {
                        //CEP pesquisado não foi encontrado.
                        limpa_formulário_cep();
                        alert("CEP não encontrado.");
                    }
                });
            } //end if.
            else {
                //cep é inválido.
                limpa_formulário_cep();
                alert("Formato de CEP inválido.");
            }
        } //end if.
        else {
            //cep sem valor, limpa formulário.
            limpa_formulário_cep();
        }
    });
});


$(document).ready(function() {
    grid()
});

function grid() {
    $.get('https://localhost:5001/Fornecedor/Listar')
        .done(function(resposta) { 
            for(i = 0; i < resposta.length; i++) {                
                let linha = $('<tr class="text-center"></tr>');

                linha.append($('<td></td>').html(resposta[i].id));
                linha.append($('<td></td>').html(resposta[i].nome));
                linha.append($('<td></td>').html(resposta[i].cnpj));
                linha.append($('<td></td>').html(resposta[i].email));
                linha.append($('<td></td>').html(resposta[i].telefone));
                linha.append($('<td></td>').html(resposta[i].cep));
                linha.append($('<td></td>').html(resposta[i].rua));
                linha.append($('<td></td>').html(resposta[i].bairro));
                linha.append($('<td></td>').html(resposta[i].cidade));
                linha.append($('<td></td>').html(resposta[i].uf));
                linha.append($('<td></td>').html(resposta[i].ibge));
                
                
                
                let botaoAlterar = $('<button class="btn  btn-primary " data-toggle="modal" data-target= "#myModaled"></button>').attr('type', 'button').html('Alterar').attr('onclick', 'alterar(' + resposta[i].id + ')');
                
                let alterar = $('<td></td>');
              
                alterar.append(botaoAlterar);
                

                linha.append(alterar);
                
                
                $('#grid').append(linha);
            }
        })
        .fail(function(erro, mensagem, excecao) { 
            alert("Erro ao consultar a API!");
        });
}

function excluir(idInput) {
    $.ajax({
        type: 'DELETE',
        url: 'https://localhost:5001/Fornecedor/Excluir/',
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(codigoInput),
        success: function(resposta) { 
            alert("Fornecedor removido com sucesso!");
            location.reload(true);
        },
        error: function(erro, mensagem, excecao) { 
            alert("Erro ao realizar a remoção!");
        }
    });
}

function cadastrar() {
    
    let fornecedor = {
        Id: 0,
        Nome: formulario.nomeInput.value,
        Cnpj: formulario.cnpjInput.value,
        Email: formulario.emailInput.value,
        Telefone: formulario.telefoneInput.value,
        Cep: formulario.cepInput.value,
        Rua: formulario.ruaInput.value,
        Bairro: formulario.bairroInput.value,
        Cidade: formulario.cidadeInput.value,
        Uf: formulario.ufInput.value,
        Ibge: formulario.ibgeInput.value

        
    };

  
    $.ajax({
        type: 'POST',
        url: 'https://localhost:5001/Fornecedor/Cadastrar',
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(fornecedor),
        success: function() {
            alert("Fornecedor cadastrado com sucesso!");
           
        },
        error: function() {
            alert("Erro888 ao realizar o cadastro!");
           
        }
    });

    
};

function editar() {
    
    let fornecedor2 = {
        Id: formulario2.idInput2.value,
        Nome: formulario.nomeInput2.value,
        Cnpj: formulario.cnpjInput2.value,
        Email: formulario.emailInput2.value,
        Telefone: formulario.telefoneInput2.value,
        Cep: formulario.cepInput2.value,
        Rua: formulario.ruaInput2.value,
        Bairro: formulario.bairroInput2.value,
        Cidade: formulario.cidadeInput2.value,
        Uf: formulario.ufInput2.value,
        Ibge: formulario.ibgeInput2.value
        
    };

  
    $.ajax({
        type: 'PUT',
        url: 'https://localhost:5001/Fornecedor/Alterar',
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(fornecedor2),
        success: function() {
            alert("Fornecedor alterado com sucesso!");
           
        },
        error: function() {
            alert("Errooooo ao realizar o cadastro!");
           
        }
    });

    
};

function alterar(id){
    $.get('https://localhost:5001/Fornecedor/Visualizar?id='+id)
        .done(function(resposta) { 
            $('#idInput2').val(resposta.id);
            $('#nomeInput2').val(resposta.nome);
            $('#cnpjInput2').val(resposta.cnpj);
            $('#emailInput2').val(resposta.email);
            $('#telefoneInput2').val(resposta.telefone);
            $('#cepInput2').val(resposta.cep);
            $('#ruaInput2').val(resposta.rua);
            $('#bairroInput2').val(resposta.bairro);
            $('#cidadeInput2').val(resposta.cidade);
            $('#ufInput2').val(resposta.uf);
            $('#ibgeInput2').val(resposta.ibge);
           
        })
        .fail(function(erro, mensagem, excecao) { 
            alert("Erro ao realizar a alteração!");
        });
}