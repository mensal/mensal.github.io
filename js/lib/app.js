var App = {

    // contextPath: "http://mensal.ddns.net:8080",
    // contextPath: "https://wildfly-mensal.a3c1.starter-us-west-1.openshiftapps.com",
    // contextPath: "http://localhost:8080",
    // contextPath: "https://mensal.ddns.net:4443",
    contextPath: "https://mensal.duckdns.org",

    getParam: function (name) {
        return new URL(document.location).searchParams.get(name)
    },

    anoCorrente: function() {
        return moment().format('YYYY');
    },

    mesCorrente: function() {
        return moment().format('MM');
    },

    isMesCorrente: function() {
        return App.mesCorrente() == params.mes && App.anoCorrente() == params.ano
    },

    meses: function() {
        var inicio = moment('2018-05-01');
        var fim = moment().startOf('M').add(1, 'M');
        var resultado = [];

        do {
            resultado.push(inicio.add(1, 'M').toDate());
        } while (inicio < fim);

        return resultado;
    },

    setAuthToken: function (token) {
        localStorage.setItem("token", token);
    },

    getAuthToken: function () {
        return "Bearer " + localStorage.getItem("token");
    },
    
    tratar401: function (xhr) {
        document.location = "login.html";
    },

    tratar422: function (xhr) {
        var text = JSON.stringify(xhr.responseJSON, null, '\t');

        alert(text ? text : xhr.responseText);
    }
};

var params;

$.ajaxSetup({
    error: function (xhr) {
        switch (xhr.status) {
            case 401:
                App.tratar401(xhr);
                break;

            case 400:
            case 422:
                App.tratar422(xhr);
                break;
        }
    }
});
