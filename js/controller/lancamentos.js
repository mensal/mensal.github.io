$(function () {
    TipoFixasProxy.todas().done(tipoFixasOk)
});

function tipoFixasOk(data) {
    $(data).each(function (i, v) {
        v.tipo = {id: v.id};
        v.id = null;
        v.dia = v.vencimento;
        v.descricao = v.nome;
        v.valor = ' ';
    });

    $('.table, #despesas-fixas').append(Mustache.render($('#lancamentos-template').html(), data));

    PagamentoFixasProxy.todas(2018, 4).done(pagamentoFixasOk);
}

function pagamentoFixasOk(data) {

    $(data).each(function (i, v) {
        var elem = $('tr[data-tipo-id="' + v.tipo.id + '"]');

        elem.find('.valor').text(total(v.valores));

        console.log(v.id);
        // elem.find('.valor').data('xpagamento-id', v.id);
        elem.data('xpagamento-id', v.id);
        elem.data('pagamento-id', "xxx");

        console.log(elem.html())

        // elem.hide()
        // console.log(elem.text);

    });
}

function total(valores) {
    var total = 0;

    $(valores).each(function (i, v) {
        total += v.valor;
    });

    return total;
}