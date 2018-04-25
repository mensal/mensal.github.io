var Grupos = {

    fixas: {
        selecao: "Escolha o tipo de despesa",
        dinamico: false,
        campos: {},
        tipoDescricao: function (tipo) {
            return tipo.nome;
        },
        pagamentoDescricao: function (pagamento) {
            return this.tipoDescricao(pagamento.tipo);
        }
    },

    diversas: {
        selecao: "Escolha  o tipo de despesa",
        dinamico: true,
        campos: {
            observacao: true
        },
        tipoDescricao: function (tipo) {
            return tipo.nome;
        },
        pagamentoDescricao: function (pagamento) {
            return this.tipoDescricao(pagamento.tipo) + (pagamento.observacao ? ': ' + pagamento.observacao.toLowerCase() : '');
        }
    },

    diaristas: {
        selecao: "Escolha a diária",
        dinamico: true,
        campos: {},
        tipoDescricao: function (tipo) {
            return 'R$ ' + numeral(tipo.valor).format().replace('.', ',');
        },
        pagamentoDescricao: function (pagamento) {
            return moment(pagamento.data).format('dddd');
        }
    },

    combustiveis: {
        selecao: "Escolha o veículo",
        dinamico: true,
        campos: {
            odometro: true,
            litros: true
        },
        tipoDescricao: function (tipo) {
            return tipo.veiculo;
        },
        pagamentoDescricao: function (pagamento) {
            return this.tipoDescricao(pagamento.tipo);
        }
    },

    atual: function (grupo) {
        if (!grupo) {
            grupo = App.getParam('grupo');
        }

        var atual = this[grupo];
        atual.nome = grupo;

        return atual;
    }
};