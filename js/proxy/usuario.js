var UsuarioProxy = {

    url: App.contextPath + "/api/usuarios",

    todos: function () {
        return $.ajax({
            type: "GET",
            url: this.url,
            headers: {
                Authorization: App.authToken()
            }
        });
    }
};