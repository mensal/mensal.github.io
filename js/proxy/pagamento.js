var PagamentoProxy = {

    url: App.contextPath + "/api/pagamento/",

    inserir: function (grupo, data) {
        return $.ajax({
            type: "POST",
            url: this.url + grupo,
            data: JSON.stringify(data),
            contentType: "application/json",
            headers: {
                Authorization: App.authToken()
            }
        });
    },

    todos: function (grupo, ano, mes) {
        return $.ajax({
            type: "GET",
            grupo: grupo,
            url: this.url + grupo,
            headers: {
                Authorization: App.authToken()
            }
        });
    },

    obter: function (grupo, id) {
        return $.ajax({
            type: "GET",
            url: this.url + grupo + '/' + id,
            headers: {
                Authorization: App.authToken()
            }
        });
    },

    atualizar: function (grupo, id, data) {
        return $.ajax({
            type: "PUT",
            url: this.url + grupo + '/' + id,
            data: JSON.stringify(data),
            contentType: "application/json",
            headers: {
                Authorization: App.authToken()
            }
        });
    },

    excluir: function (grupo, id) {
        return $.ajax({
            type: "DELETE",
            url: this.url + grupo + '/' + id,
            headers: {
                Authorization: App.authToken()
            }
        });
    }
};