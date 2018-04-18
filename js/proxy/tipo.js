var TipoProxy = {

    url: App.contextPath + "/api/tipo/",

    todos: function (grupo) {
        return $.ajax({
            type: "GET",
            grupo: grupo,
            url: this.url + grupo,
            headers: {
                Authorization: App.authToken()
            }
        });
    },
};