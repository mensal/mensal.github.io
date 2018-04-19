var Grupos = {

    fixas: {
        selecao: "Escolha o tipo de despesa",
        descricaoTipo: "nome",
        dinamico: false,
        campos: {}
    },

    diversas: {
        selecao: "Escolha  o tipo de despesa",
        descricaoTipo: "nome",
        dinamico: true,
        campos: {
            observacao: true,
        }
    },

    diaristas: {
        selecao: "Escolha a diária",
        descricaoTipo: "valor",
        dinamico: true,
        campos: {}
    },

    combustiveis: {
        selecao: "Escolha o veículo",
        descricaoTipo: "veiculo",
        dinamico: true,
        campos: {
            odometro: true,
            litros: true
        }
    },

    atual: function () {
        var grupo = App.getParam('grupo');
        var atual = this[grupo];
        atual.nome = grupo;

        return atual;
    }
};