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

    $('#titulo').html(params.ano + '/' + params.mes);

    preencherDias();

    // $('#x-params').text(JSON.stringify(params, null, '\t'));

    if (isNovo()) {
        // $('#data').val(moment().format('YYYY-MM-DD'));
        $('#data').val(moment().format('D'));

        $('#tipos').append($('<option>', {text: Grupos.atual().selecao, selected: true, disabled: true}));

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

function preencherDias(data) {
    var dias = new Date(params.ano, params.mes - 1, 0).getDate();

    for (var dia = dias; dia > 0; dia--) {
        var texto = 'Dia ' + dia + ', ' + moment(new Date(params.ano, params.mes - 1, dia)).format('dddd').toLowerCase();

        if (dia == new Date().getDate()) {
            texto += ' (hoje)';
        }

        $('#data').append(new Option(texto, dia));
    }
}

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
        data: moment(new Date(params.ano, params.mes - 1, $('#data').val())).format('YYYY-MM-DD'),
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

    // $('#data').val(data.data);
    $('#data').val(moment(data.data).format('D'));
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
        $('#tipos').append(criarOption(v, tipoId == v.id || data.length == 1));
    });

    if (!isNovo() || data.length == 1) {
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

        if (valor && valor[0] && valor[0].valor) {
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
    return $('<option>', {
        value: tipo.id,
        text: Grupos.atual().tipoDescricao(tipo),
        selected: selected,
        disabled: !Grupos.atual().dinamico && !selected
    });
}
