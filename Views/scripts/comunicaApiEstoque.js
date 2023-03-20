$(document).ready(function() {
    grid();
});


function grid() {
    $.get('https://localhost:5001/ListaEstoque/Listar')
        .done(function(resposta) { 
            for(i = 0; i < resposta.length; i++) {                
                let linha = $('<tr class="text-center"></tr>');
                
                linha.append($('<td></td>').html(resposta[i].codigoProdutoNavigation.codigo));
                linha.append($('<td></td>').html(resposta[i].codigoProdutoNavigation.descricao));
                linha.append($('<td></td>').html(resposta[i].qtde));
                linha.append($('<td></td>').html(resposta[i].valorUnitario));
                var arredondar = resposta[i].valorUnitario*resposta[i].qtde
                linha.append($('<td></td>').html(arredondar.toFixed(2)));
                
                 
                $('#grid').append(linha);
   
            }

            var table = document.getElementById("table_id"), sumVal = 0;

            for(var i = 1; i < table.rows.length; i++)
            {
                sumVal = sumVal + parseInt(table.rows[i].cells[4].innerHTML);
            }

            let linha2 = $('<tr class="text-center"></tr>');
        
            linha2.append($('<td colspan="4"></td>').html("SALDO TOTAL"));
            linha2.append($('<td  ></td>').html(sumVal.toFixed(2)));
            $('#gridEstoque').append(linha2);
                       
        })
        .fail(function(erro, mensagem, excecao) { 
            alert("Erro ao consultar a API!");
        });
}
