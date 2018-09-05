var App = {

    // contextPath: "http://mensal.ddns.net:8080",
    contextPath: "https://wildfly-mensal.a3c1.starter-us-west-1.openshiftapps.com",
    // contextPath: "http://localhost:8080",

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

    setAuthToken: function (token) {
        localStorage.setItem("token", token);
    },

    getAuthToken: function () {
        return "Bearer " + localStorage.getItem("token");
    },
    
    tratar401: function (xhr) {
        document.location = "login";
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
