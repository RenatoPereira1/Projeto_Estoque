$(document).ready(function() {
    grid();
});


function cadastrar() {
    
    let produto2 = {
        Id : 0,
        CodigoProduto: formulario.codigoInput.value,
        Qtde: formulario.qtdInput.value,
        DataSaida: formulario.dataInput.value,
        ValorUnitario: formulario.unitarioInput.value
           
    };

  
    $.ajax({
        type: 'POST',
        url: 'https://localhost:5001/SaidaProduto/Saida',
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(produto2),
        success: function() {
            alert("Saida registrada com sucesso!");
           
        },
        error: function() {
            alert("Erro ao realizar a saida!");
           
        }
    });

    
};

function grid() {
    $.get('https://localhost:5001/SaidaProduto/Listar')
        .done(function(resposta) { 
            for(i = 0; i < resposta.length; i++) {                
                let linha = $('<tr class="text-center"></tr>');
                
                linha.append($('<td></td>').html(resposta[i].codigoProdutoNavigation.codigo));
                linha.append($('<td></td>').html(resposta[i].codigoProdutoNavigation.descricao));
                linha.append($('<td></td>').html(resposta[i].qtde));
                linha.append($('<td></td>').html(resposta[i].dataSaida));
                linha.append($('<td></td>').html(resposta[i].valorUnitario));
                linha.append($('<td></td>').html(resposta[i].valorUnitario*resposta[i].qtde));
 
                
                 
                $('#grid').append(linha);
   
            }

            
                       
        })
        .fail(function(erro, mensagem, excecao) { 
            alert("Erro ao consultar a API!");
        });
}

