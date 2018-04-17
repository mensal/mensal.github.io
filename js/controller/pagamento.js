$(function () {
    moment.locale("pt-br");
    numeral.locale('pt-br');
    numeral.defaultFormat('0.00');

    params = {
        ano: App.getParam('ano'),
        mes: App.getParam('mes'),
        grupo: App.getParam('grupo'),
        pagamentoId: App.getParam('pagamento_id'),
        tipoId: App.getParam('tipo_id')
    };

    $('#x-params').text(JSON.stringify(params, null, '\t'));

    if (!isNovo()) {
        PagamentoProxy.obter(params.grupo, params.pagamentoId).done(obterPagamentoOk);
    } else {
        var option = $('<option>', {
            text: Grupos.atual().tipo,
            selected: true,
            disabled: true
        });
        $('#tipos').append(option);

        TipoProxy.todas(params.grupo).done(function (data) {
            obterTiposOk(data, params.tipoId);
        });

        // $('#x-pagamento').text("Novo registro");
    }

    $("form").submit(salvar);
});

function salvar(event) {
    event.preventDefault();

    document.location = "pagamentos?ano=" + params.ano + "&mes=" + params.mes;
}

function isNovo() {
    return App.getParam('pagamento_id') == null;
}

function obterPagamentoOk(data) {
    $('#x-pagamento').text(JSON.stringify(data, null, '\t'));

    $('#tipos').append(criarOption(data.tipo, true));

    $('#observacao').val(data.observacao);
    $('#odometro').val(data.observacao);
    $('#litros').val(data.observacao);

    TipoProxy.todas(params.grupo).done(function (_data) {
        obterTiposOk(_data, data.tipo.id);
    });
}

function obterTiposOk(data, tipoId) {
    $(data).each(function (i, v) {
        $('#tipos').append(criarOption(v, tipoId == v.id));
    });

    if (!isNovo()) {
        $('#tipos').children().first().remove();
    }
}

function criarOption(tipo, selected) {
    var texto = tipo[Grupos.atual().descricaoTipo];

    return $('<option>', {
        id: tipo.id,
        text: isNaN(texto) ? texto : numeral(texto).format(),
        selected: selected,
        disabled: !Grupos.atual().dinamico && !selected
    });
}
