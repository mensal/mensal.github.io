var Grupos = {

    fixas: {
        tipo: "Tipo de despesa",
        descricaoTipo: "nome",
        dinamico: false,
        campos: {}
    },

    diversas: {
        tipo: "Tipo de despesa",
        descricaoTipo: "nome",
        dinamico: true,
        campos: {
            observacao: true,
        }
    },

    diaristas: {
        tipo: "Diária",
        descricaoTipo: "valor",
        dinamico: true,
        campos: {}
    },

    combustiveis: {
        tipo: "Veículo",
        descricaoTipo: "veiculo",
        dinamico: true,
        campos: {
            odometro: true,
            litros: true
        }
    },

    atual: function () {
        return this[App.getParam('grupo')];
    }
};