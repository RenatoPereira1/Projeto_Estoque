$(document).ready(function() {
    grid()
});

function grid() {
    $.get('https://localhost:5001/Usuario/Listar')
        .done(function(resposta) { 
            for(i = 0; i < resposta.length; i++) {                
                let linha = $('<tr class="text-center"></tr>');
                
                linha.append($('<td></td>').html(resposta[i].login));
                linha.append($('<td></td>').html(resposta[i].nome));
                linha.append($('<td></td>').html('*******'));
                linha.append($('<td></td>').html(resposta[i].grupo));
                linha.append($('<td></td>').html(resposta[i].cpf));
                linha.append($('<td></td>').html(resposta[i].email));
                if (resposta[i].ativo == 1){
                    linha.append($('<td></td>').html('ativado'));
                }else{linha.append($('<td></td>').html('desativado'));}
                
                
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
        url: 'https://localhost:5001/Usuario/Excluir/',
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(codigoInput),
        success: function(resposta) { 
            alert("Produto removido com sucesso!");
            location.reload(true);
        },
        error: function(erro, mensagem, excecao) { 
            alert("Erro ao realizar a remoção!");
        }
    });
}

function cadastrar() {
    
    let produto = {
        Id: 0,
        Login: formulario.loginInput.value,
        Nome: formulario.nomeInput.value,
        Senha: formulario.senhaInput.value,
        Grupo: $('#grupoInput').val(),
        Cpf: formulario.cpfInput.value,
        Email: formulario.emailInput.value,
        Ativo: $('#ativoInput').val()
        
    };

  
    $.ajax({
        type: 'POST',
        url: 'https://localhost:5001/Usuario/Cadastrar',
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(produto),
        success: function() {
            alert("Produto cadastrado com sucesso!");
           
        },
        error: function() {
            alert("Erro ao realizar o cadastro!");
           
        }
    });

    
};

function editar() {
    
    let usuario = {
        Id: formulario2.idInput2.value,
        Login: formulario2.loginInput2.value,
        Nome: formulario2.nomeInput2.value,
        Senha: formulario2.senhaInput2.value,
        Grupo: $('#grupoInput2').val(),
        Cpf: formulario2.cpfInput2.value,
        Email: formulario2.emailInput2.value,
        Ativo: $('#ativoInput2').val()
        
    };

  
    $.ajax({
        type: 'PUT',
        url: 'https://localhost:5001/Usuario/Alterar',
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(usuario),
        success: function() {
            alert("Usuario alterado com sucesso!");
           
        },
        error: function() {
            alert("Errooooooo ao realizar o cadastro!");
           
        }
    });

    
};

function alterar(id){
    $.get('https://localhost:5001/Usuario/Visualizar?id='+id)
        .done(function(resposta) { 
            $('#idInput2').val(resposta.id);
            $('#loginInput2').val(resposta.login);
            $('#nomeInput2').val(resposta.nome);
            $('#senhaInput2').val(resposta.senha);
            $('#grupoInput2').val(resposta.grupo);
            $('#cpfInput2').val(resposta.cpf);
            $('#emailInput2').val(resposta.email);
            $('#ativoInput2').val(resposta.ativo);
           
        })
        .fail(function(erro, mensagem, excecao) { 
            alert("Erro ao realizar a alteração!");
        });
}