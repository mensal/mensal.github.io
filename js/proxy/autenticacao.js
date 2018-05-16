var AutenticacaoProxy = {

    url: App.contextPath + "/api/autenticacao",

    autenticar: function (data) {
        return $.ajax({
            type: "POST",
            url: this.url,
            data: JSON.stringify(data),
            contentType: "application/json"
        });
    },
};