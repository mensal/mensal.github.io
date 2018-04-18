var TipoProxy = {

    url: App.contextPath + "/api/tipo/",

    todas: function (grupo) {
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