var App = {

    contextPath: "https://despesas-despesas.a3c1.starter-us-west-1.openshiftapps.com",
    // contextPath: "http://localhost:8080"

    getParam: function (name) {
        return new URL(document.location).searchParams.get(name)
    }
};
