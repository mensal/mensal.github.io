$(function () {

    // TipoDiversasProxy.buscar(4, 2018).done(buscarOk)
});

function buscarOk(data) {
    $.each(data, function (i, elem) {
        elem.num = i + 1;
        var renderizado = Mustache.render($('#template').html(), elem);
        $(".table > tbody").append(renderizado)
    })
}
