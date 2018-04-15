var params;

$(function () {
    params = {
        ano: App.getParam('ano'),
        mes: App.getParam('mes'),
        grupo: App.getParam('grupo'),
        pagamentoId: App.getParam('pagamento_id'),
        tipoId: App.getParam('tipo_id')
    };

    $('#x-params').text(JSON.stringify(params, null, '\t'));

    if (params.pagamentoId) {
        PagamentoProxy.obter(params.grupo, params.pagamentoId).done(obterPagamentoOk);
    } else {
        $('#x-pagamento').text("Novo registro");
        TipoProxy.todas(params.grupo).done(obterTiposOk);
    }
});

function obterPagamentoOk(data) {
    $('#x-pagamento').text(JSON.stringify(data, null, '\t'));

    TipoProxy.todas(params.grupo).done(obterTiposOk);
}

function obterTiposOk(data) {
    $('#x-tipos').text(JSON.stringify(data, null, '\t'));
}
