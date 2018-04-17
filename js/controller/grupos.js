var Grupos = {

    fixas: {
        tipo: "Tipo de despesa",
        descricaoTipo: "nome",
        dinamico: false
    },

    diversas: {
        tipo: "Tipo de despesa",
        descricaoTipo: "nome",
        observacao: true,
        dinamico: true
    },

    diaristas: {
        tipo: "Diária",
        descricaoTipo: "valor",
        dinamico: true
    },

    combustiveis: {
        tipo: "Veículo",
        descricaoTipo: "veiculo",
        dinamico: true
    },

    atual: function () {
        return this[App.getParam('grupo')];
    }
};