$(function () {
    moment.locale("pt-br");
    numeral.locale('pt-br');
    numeral.defaultFormat('0.00');

    TipoProxy.todas('fixas').done(tipoFixasOk);

    var grupos = [
        'diversas',
        'diaristas',
        'combustiveis'
    ];

    $(grupos).each(function (i, v) {
        PagamentoProxy.todas(v, App.getParam('ano'), App.getParam('mes')).done(function (data) {
            pagamentoOk(v, data);
        });
    });

    $('.table').on('click', '.lancamento-click', function () {
        var grupo = $(this).parents('.table').attr('id');
        var tipoId = $(this).data('tipo-id');
        var pagamentoId = $(this).data('pagamento-id');

        var url = 'pagamento.html?grupo=' + grupo;
        url += '&ano=' + App.getParam('ano');
        url += '&mes=' + App.getParam('mes');
        url += (pagamentoId ? '&pagamento_id=' + pagamentoId : '');
        url += (tipoId ? '&tipo_id=' + tipoId : '');

        document.location = url;
    });
});

function tipoFixasOk(data) {
    $(data).each(function (i, v) {
        v.tipo = {id: v.id};
        v.id = null;
        v.dia = numeral(v.vencimento).format('00');
        v.descricao = v.nome;
        v.valor = '';
    });

    renderizarTabela($('#fixas'), data);

    PagamentoProxy.todas('fixas', App.getParam('ano'), App.getParam('mes')).done(pagamentoFixasOk);
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
        v.descricao = v.tipo.nome;
        v.valor = numeral(total(v.valores)).format();
    });

    renderizarTabela($('#' + grupo), data);
}

function renderizarTabela(elem, data) {
    elem.find('tbody').append(Mustache.render($('#lancamentos-template').html(), data));
}

function total(valores) {
    var total = 0;

    $(valores).each(function (i, v) {
        total += v.valor;
    });

    return total;
}