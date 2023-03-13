//Funcao para logar no sistema
function logar() {
    var login = $("#login_input").val();
    var senha = $("#password_input").val();


    $.get('https://localhost:5001/Usuario/Listar')
        .done(function (resposta) {
            for (i = 0; i < resposta.length; i++) {
                if (resposta[i].login == login && resposta[i].senha == senha) {
                    if (resposta[i].grupo == 'administrador') {
                        window.location.href = "./Tela_adm.html?administrador";
                    } else { window.location.href = "./EntradaProduto.html?usuario" }
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Credenciais incorretas, tente novamente!!'
                    })
                }
            }
        })
        .fail(function (erro, mensagem, excecao) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Algo de errado aconteceu!',
                footer: '<a href="mailto:m4rxhs3301@gmail.com" target="_blank">Contate o administrador aqui</a>'
            })
        });


}


//Funcao para deslogar do sistema
function logout() {
    window.location.href = "index.html";
}