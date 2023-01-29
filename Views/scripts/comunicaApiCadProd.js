$(document).ready(function() {
    grid()
});

function grid() {
    $.get('https://localhost:5001/Produto/Listar')
        .done(function(resposta) { 
            for(i = 0; i < resposta.length; i++) {                
                let linha = $('<tr class="text-center"></tr>');
                
                linha.append($('<td></td>').html(resposta[i].codigo));
                linha.append($('<td></td>').html(resposta[i].descricao));
                linha.append($('<td></td>').html(resposta[i].classe));
                
                let botaoExcluir = $('<button class="btn btn-danger"></button>').attr('type', 'button').html('Excluir').attr('onclick', 'excluir(' + resposta[i].codigo + ')');
                
                let excluir = $('<td></td>');
              
                excluir.append(botaoExcluir);
                

                linha.append(excluir);
                
                
                $('#grid').append(linha);
            }
        })
        .fail(function(erro, mensagem, excecao) { 
            alert("Erro ao consultar a API!");
        });
}

function excluir(codigoInput) {
    $.ajax({
        type: 'DELETE',
        url: 'https://localhost:5001/Produto/Excluir/',
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
        Codigo: formulario.codigoInput.value,
        Descricao: formulario.nomeInput.value,
        Classe: formulario.classeInput.value
        
    };

  
    $.ajax({
        type: 'POST',
        url: 'https://localhost:5001/Produto/Cadastrar',
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

