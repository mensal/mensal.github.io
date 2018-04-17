var App = {

    contextPath: "https://despesas-despesas.a3c1.starter-us-west-1.openshiftapps.com",
    // contextPath: "http://localhost:8080",

    getParam: function (name) {
        return new URL(document.location).searchParams.get(name)
    }
};

var params;

// var grupos = {
//
//     fixas: {
//         tipo: "Tipo de despesa",
//         descricaoTipo: "nome",
//         dinamico: false
//     },
//
//     diversas: {
//         tipo: "Tipo de despesa",
//         descricaoTipo: "nome",
//         observacao: true,
//         dinamico: true
//     },
//
//     diaristas: {
//         tipo: "Diária",
//         descricaoTipo: "valor",
//         valor: true,
//         dinamico: true
//     },
//
//     combustiveis: {
//         tipo: "Veículo",
//         descricaoTipo: "veiculo",
//         valor: true,
//         odometro: true,
//         litros: true,
//         dinamico: true
//     },
//
//     atual: function () {
//         return this[App.getParam('grupo')];
//     }
// }