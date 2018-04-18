$(function () {
    moment.locale('pt-br');
    numeral.defaultFormat('0.00');

    params = {
        ano: App.getParam('ano'),
        mes: App.getParam('mes'),
        grupo: App.getParam('grupo'),
        pagamentoId: App.getParam('pagamento_id'),
        tipoId: App.getParam('tipo_id')
    };

    // $('#x-params').text(JSON.stringify(params, null, '\t'));

    if (isNovo()) {
        $('#data').val(moment().format('YYYY-MM-DD'));
        $('#tipos').append($('<option>', {text: Grupos.atual().tipo, selected: true, disabled: true}));

        TipoProxy.todos(params.grupo).done(function (data) {
            obterTiposOk(data, params.tipoId);
        });

        UsuarioProxy.todos().done(function (_data) {
            obterUsuariosOk(_data);
        });

        // $('#x-pagamento').text("Novo registro");
    } else {
        $('#salvar').parent().removeClass('col-12').addClass('col-6');
        $('#excluir').parent().attr('hidden', false);

        PagamentoProxy.obter(params.grupo, params.pagamentoId).done(obterPagamentoOk);
    }

    $('.campo').each(function (i, v) {
        if (Grupos.atual().campos[v.id]) {
            $(v).parent().attr('hidden', false);
        }
    });

    aplicarMascaras();

    $('#salvar').click(salvar);
    $('#excluir').click(excluir);
});

function isNovo() {
    return App.getParam('pagamento_id') == null;
}

function excluir(event) {
    event.preventDefault();

    if (confirm('O registro será apagado.')) {
        PagamentoProxy.excluir(App.getParam('grupo'), App.getParam('pagamento_id'), $('form').data('versao')).done(voltar);
    }
}

function salvar(event) {
    event.preventDefault();
    var data = montarData();

    if (isNovo()) {
        PagamentoProxy.inserir(App.getParam('grupo'), data).done(voltar);
    } else {
        PagamentoProxy.atualizar(App.getParam('grupo'), App.getParam('pagamento_id'), data, $('form').data('versao')).done(voltar);
    }
}

function montarData() {
    var data = {
        tipo: {
            id: $('#tipos').val()
        },
        data: $('#data').val(),
        valores: []
    };

    for (var v in Grupos.atual().campos) {
        data[v] = $('#' + v).val();
    }

    $('.valor').each(function (i, v) {
        if ($(v).val()) {
            var valor = {
                valor: $(v).val(),
                usuario: {
                    id: $(v).data('usuario-id')
                }
            };

            data.valores.push(valor);
        }
    });

    return data;
}

function voltar() {
    document.location = "pagamentos?ano=" + params.ano + "&mes=" + params.mes;
}

function obterPagamentoOk(data, status, xhr) {
    $('form').data('versao', xhr.getResponseHeader('Last-Modified'));

    // $('#x-pagamento').text(JSON.stringify(data, null, '\t'));
    $('#tipos').append(criarOption(data.tipo, true));

    $('#data').val(data.data);
    $('#observacao').val(data.observacao);
    $('#odometro').val(data.odometro);
    $('#litros').val(data.litros);

    TipoProxy.todos(params.grupo).done(function (_data) {
        obterTiposOk(_data, data.tipo.id);
    });

    UsuarioProxy.todos().done(function (_data) {
        obterUsuariosOk(_data, data.valores);
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

function obterUsuariosOk(data, valores) {
    $(data).each(function (i, v) {
        var valor;
        if (valores) {
            valor = $.grep(valores, function (_v, _i) {
                return v.id == _v.usuario.id;
            });
        }

        if (valor) {
            v.valor = numeral(valor[0].valor).format();
        }
    });

    $('#valores').html(Mustache.render($('#valores-template').html(), data));
    aplicarMascaras();
}

function aplicarMascaras() {
    $('#odometro').mask('000000', {reverse: true, selectOnFocus: true});
    $('#litros').mask('000.00', {reverse: true, selectOnFocus: true});
    $('input.valor').mask('000000.00', {reverse: true, selectOnFocus: true});
}

function criarOption(tipo, selected) {
    var texto = tipo[Grupos.atual().descricaoTipo];

    return $('<option>', {
        value: tipo.id,
        text: isNaN(texto) ? texto : numeral(texto).format(),
        selected: selected,
        disabled: !Grupos.atual().dinamico && !selected
    });
}
