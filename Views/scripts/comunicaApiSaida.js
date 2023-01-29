

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

