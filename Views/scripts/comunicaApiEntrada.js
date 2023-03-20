
$(document).ready(function() {
    grid();
});

function cadastrar() {
    
    let produto = {
        Id : 0,
        CodigoProduto: formulario.codigoInput.value,
        Solicitante: formulario.solicitanteInput.value,
        Qtde: formulario.qtdInput.value,
        ValorUnitario: formulario.unitarioInput.value,
        DataEntrada: formulario.dataInput.value,
        Lote: formulario.loteInput.value,
        Vencimento: formulario.venciInput.value,
        Notafiscal: formulario.nfInput.value,
        IdFornecedor: formulario.fornecedorInput.value
        
    };

  
    $.ajax({
        type: 'POST',
        url: 'https://localhost:5001/EntradaProduto/Cadastrando',
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(produto),
        success: function() {
            alert("Produto cadastrado com sucesso!");
           
        },
        error: function() {
            alert("Errooii ao realizar o cadastro!");
           
        }
    });

    
};




function grid() {
    $.get('https://localhost:5001/EntradaProduto/Listar')
        .done(function(resposta) { 
            for(i = 0; i < resposta.length; i++) {                
                let linha = $('<tr class="text-center"></tr>');
                
                linha.append($('<td></td>').html(resposta[i].codigoProdutoNavigation.codigo));
                linha.append($('<td></td>').html(resposta[i].codigoProdutoNavigation.descricao));
                linha.append($('<td></td>').html(resposta[i].solicitante));
                linha.append($('<td></td>').html(resposta[i].qtde));
                linha.append($('<td></td>').html(resposta[i].valorUnitario));
                linha.append($('<td></td>').html(resposta[i].valorUnitario*resposta[i].qtde));
                linha.append($('<td></td>').html(resposta[i].dataEntrada));
                linha.append($('<td></td>').html(resposta[i].lote));
                linha.append($('<td></td>').html(resposta[i].vencimento));
                linha.append($('<td></td>').html(resposta[i].notafiscal));
                linha.append($('<td></td>').html(resposta[i].idFornecedorNavigation.nome));
                
                
                 
                $('#grid').append(linha);
   
            }

            
                       
        })
        .fail(function(erro, mensagem, excecao) { 
            alert("Erro ao consultar a API!");
        });
}


