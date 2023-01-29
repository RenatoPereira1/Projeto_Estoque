

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
        Notafiscal: formulario.nfInput.value
        
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
            alert("Erro ao realizar o cadastro!");
           
        }
    });

    
};

