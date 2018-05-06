$(function () {
    moment.locale("pt-br");
    numeral.locale('pt-br');
    numeral.defaultFormat('0,0.00');

    params = {
        ano: App.getParam('ano'),
        mes: App.getParam('mes')
    };

    redirecionaParaDataCorreta();

    $('#periodo').val(params.ano + '-' + numeral(params.mes).format('00'));

    $('#periodo').change(function () {
        var periodo = $(this).val().split('-');
        document.location = 'pagamentos?ano=' + periodo[0] + '&mes=' + periodo[1];
    });

    TipoProxy.todos('fixas', params.ano, params.mes).done(tipoFixasOk);

    for (var grupo in Grupos) {
        if (Grupos[grupo].dinamico) {
            PagamentoProxy.todos(grupo, params.ano, params.mes).done(function (data) {
                pagamentoOk(this.grupo, data);
            });
        }
    }

    $('.table').on('click', '.lancamento-click', function () {
        var grupo = $(this).parents('.table').attr('id');
        var tipoId = $(this).data('tipo-id');
        var pagamentoId = $(this).data('pagamento-id');

        var url = 'pagamento?grupo=' + grupo;
        url += '&ano=' + params.ano;
        url += '&mes=' + params.mes;

        if (pagamentoId) {
            url += '&pagamento_id=' + pagamentoId;
        } else if (grupo == 'fixas') {
            url += (tipoId ? '&tipo_id=' + tipoId : '');
        }

        document.location = url;
    });
});

function redirecionaParaDataCorreta() {
    var mesCorrente = moment().format('MM');
    var anoCorrente = moment().format('YYYY');

    if (mesCorrente != params.mes || anoCorrente != params.ano) {
        if (confirm('Redirecionando para o mês atual, ' + moment().format('MMMM') + ' de ' + moment().format('YYYY') + '.')) {
            document.location = "pagamentos?ano=" + anoCorrente + "&mes=" + mesCorrente;
        }
    }
}

function tipoFixasOk(data) {
    $(data).each(function (i, v) {
        v.tipo = {id: v.id};
        v.id = null;
        v.dia = numeral(v.vencimento).format('00');
        v.descricao = v.nome;
        v.valor = '';
    });

    renderizarTabela($('#fixas'), data);

    PagamentoProxy.todos('fixas', params.ano, params.mes).done(pagamentoFixasOk);
}

function pagamentoFixasOk(data) {
    $(data).each(function (i, v) {
        var elem = $('tr[data-tipo-id="' + v.tipo.id + '"]');

        elem.find('.valor').text(numeral(total(v.valores)).format());
        elem.data('pagamento-id', v.id);
    });
}

function pagamentoOk(grupo, data) {
    $(data).each(function (i, v) {
        v.dia = moment(v.data).format('DD');
        v.descricao = Grupos.atual(grupo).pagamentoDescricao(v);
        v.valor = numeral(total(v.valores)).format();
    });

    renderizarTabela($('#' + grupo), data);
}

function renderizarTabela(elem, data) {
    elem.find('tbody').html(Mustache.render($('#lancamentos-template').html(), data));
}

function total(valores) {
    var total = 0;

    $(valores).each(function (i, v) {
        total += v.valor;
    });

    return total;
}