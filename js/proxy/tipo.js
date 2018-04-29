var TipoProxy = {

    url: App.contextPath + "/api/tipo/",

    todos: function (grupo, ano, mes) {
        return $.ajax({
            type: "GET",
            grupo: grupo,
            data: {
                ano: ano,
                mes: mes
            },
            url: this.url + grupo,
            headers: {
                Authorization: App.authToken()
            }
        });
    },
};