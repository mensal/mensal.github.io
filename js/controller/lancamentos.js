$(function () {

    // TipoDiversasProxy.buscar(4, 2018).done(buscarOk)

    console.log("aqui1");
    TipoFixasProxy.todas().done(todasFixasOk)

});

function todasFixasOk(data) {
    console.log("aqui");

    $(data).each(function (i, elem) {

        elem.dia = elem.vencimento;
        elem.descricao = elem.nome;
        elem.valor = " ";

        var renderizado = Mustache.render($('#lancamentos-template').html(), elem);
        $("#despesas-fixas > tbody").append(renderizado)
    });

    // $.each(data, function (i, elem) {
    //     elem.num = i + 1;
    //     var renderizado = Mustache.render($('#template').html(), elem);
    //     $(".table > tbody").append(renderizado)
    // })
}
