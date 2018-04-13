$(function () {
    moment.locale("pt-br");
    // numeral.locale('pt-br');
    numeral.defaultFormat('0.00');

    TipoProxy.todas('fixas').done(tipoFixasOk);
    PagamentoProxy.todas('diversas', 2018, 4).done(pagamentoOk);
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

    PagamentoProxy.todas('fixas', 2018, 4).done(pagamentoFixasOk);
}

function pagamentoFixasOk(data) {
    $(data).each(function (i, v) {
        var elem = $('tr[data-tipo-id="' + v.tipo.id + '"]');

        elem.find('.valor').text(numeral(total(v.valores)).format());
        elem.data('pagamento-id', v.id);
    });
}

function pagamentoOk(data) {
    $(data).each(function (i, v) {
        v.dia = moment(v.data).format('DD');
        v.descricao = v.tipo.nome;
        v.valor = numeral(total(v.valores)).format();
    });

    renderizarTabela($('#diversas'), data);
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