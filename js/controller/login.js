$(function () {
    $('#login').focus();

    $('form').submit(function (event){
        event.preventDefault();

        var data = {
            'login': $("#login").val().trim(),
            'senha': $("#senha").val()
        };

        AutenticacaoProxy.autenticar(data).done(autenticarOk);
    });
});

function autenticarOk(data) {
    App.setAuthToken(data);

    document.location = "pagamentos";
}