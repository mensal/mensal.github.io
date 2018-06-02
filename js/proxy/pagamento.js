var PagamentoProxy = {

    url: App.contextPath + "/api/pagamento/",

    inserir: function (grupo, data) {
        return $.ajax({
            type: "POST",
            url: this.url + grupo,
            data: JSON.stringify(data),
            contentType: "application/json",
            headers: {Authorization: App.getAuthToken()}
        });
    },

    todos: function (grupo, ano, mes) {
        return $.ajax({
            type: "GET",
            grupo: grupo,
            data: {
                ano: ano,
                mes: mes
            },
            url: this.url + grupo,
            headers: {Authorization: App.getAuthToken()}
        });
    },

    obter: function (grupo, id) {
        return $.ajax({
            type: "GET",
            url: this.url + grupo + '/' + id,
            headers: {Authorization: App.getAuthToken()}
        });
    },

    atualizar: function (grupo, id, data, versao) {
        return $.ajax({
            type: "PUT",
            url: this.url + grupo + '/' + id,
            data: JSON.stringify(data),
            contentType: "application/json",
            headers: {Authorization: App.getAuthToken(), "If-Unmodified-Since": versao}
        });
    },

    excluir: function (grupo, id, versao) {
        return $.ajax({
            type: "DELETE",
            url: this.url + grupo + '/' + id,
            headers: {Authorization: App.getAuthToken(), "If-Unmodified-Since": versao}
        });
    },

    saldo: function (grupo, ano, mes) {
        return $.ajax({
            type: "GET",
            grupo: grupo,
            data: {
                ano: ano,
                mes: mes
            },
            url: this.url + grupo + '/saldo',
            headers: {Authorization: App.getAuthToken()}
        });
    },

    resumo: function (ano, mes) {
        return $.ajax({
            type: "GET",
            data: {
                ano: ano,
                mes: mes
            },
            url: this.url + 'resumo',
            headers: {Authorization: App.getAuthToken()}
        });
    }
};