var PagamentoProxy = {

    url: App.contextPath + "/api/pagamento/",

    inserir: function (grupo, data) {
        return $.ajax({
            type: "POST",
            url: this.url + grupo,
            data: JSON.stringify(data),
            contentType: "application/json",
            headers: {
                Authorization: "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJjZWE4ZGMxNC0zZmJmLTQyOGUtODgxMi05NjY5NGEwMzFkZjMiLCJuYW1lIjoiQ2xldmVyc29uIiwiaXNzIjoiaHR0cDovL3Rlc3RlIiwiZXhwIjoxNTI0MDA3MTMzLCJpYXQiOjE1MjM1NzUxMzN9.pkLAf2ExY7gBaJRIpWW3vwkSKsctyJFjqCXB8oFIdjm7tQMI2e6nmmhGVWQwXd_djsULBs0t2N0egT-eIazIwA"
            }
        });
    },

    todas: function (grupo, ano, mes) {
        return $.ajax({
            type: "GET",
            grupo: grupo,
            url: this.url + grupo,
            headers: {
                Authorization: "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJjZWE4ZGMxNC0zZmJmLTQyOGUtODgxMi05NjY5NGEwMzFkZjMiLCJuYW1lIjoiQ2xldmVyc29uIiwiaXNzIjoiaHR0cDovL3Rlc3RlIiwiZXhwIjoxNTI0MDA3MTMzLCJpYXQiOjE1MjM1NzUxMzN9.pkLAf2ExY7gBaJRIpWW3vwkSKsctyJFjqCXB8oFIdjm7tQMI2e6nmmhGVWQwXd_djsULBs0t2N0egT-eIazIwA"
            }
        });
    },

    obter: function (grupo, id) {
        return $.ajax({
            type: "GET",
            url: this.url + grupo + '/' + id,
            headers: {
                Authorization: "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJjZWE4ZGMxNC0zZmJmLTQyOGUtODgxMi05NjY5NGEwMzFkZjMiLCJuYW1lIjoiQ2xldmVyc29uIiwiaXNzIjoiaHR0cDovL3Rlc3RlIiwiZXhwIjoxNTI0MDA3MTMzLCJpYXQiOjE1MjM1NzUxMzN9.pkLAf2ExY7gBaJRIpWW3vwkSKsctyJFjqCXB8oFIdjm7tQMI2e6nmmhGVWQwXd_djsULBs0t2N0egT-eIazIwA"
            }
        });
    },

    atualizar: function (grupo, id, data) {
        return $.ajax({
            type: "PUT",
            url: this.url + grupo + '/' + id,
            data: JSON.stringify(data),
            contentType: "application/json",
            headers: {
                Authorization: "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJjZWE4ZGMxNC0zZmJmLTQyOGUtODgxMi05NjY5NGEwMzFkZjMiLCJuYW1lIjoiQ2xldmVyc29uIiwiaXNzIjoiaHR0cDovL3Rlc3RlIiwiZXhwIjoxNTI0MDA3MTMzLCJpYXQiOjE1MjM1NzUxMzN9.pkLAf2ExY7gBaJRIpWW3vwkSKsctyJFjqCXB8oFIdjm7tQMI2e6nmmhGVWQwXd_djsULBs0t2N0egT-eIazIwA"
            }
        });
    },

    excluir: function (grupo, id) {
        return $.ajax({
            type: "DELETE",
            url: this.url + grupo + '/' + id,
            headers: {
                Authorization: "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJjZWE4ZGMxNC0zZmJmLTQyOGUtODgxMi05NjY5NGEwMzFkZjMiLCJuYW1lIjoiQ2xldmVyc29uIiwiaXNzIjoiaHR0cDovL3Rlc3RlIiwiZXhwIjoxNTI0MDA3MTMzLCJpYXQiOjE1MjM1NzUxMzN9.pkLAf2ExY7gBaJRIpWW3vwkSKsctyJFjqCXB8oFIdjm7tQMI2e6nmmhGVWQwXd_djsULBs0t2N0egT-eIazIwA"
            }
        });
    }
};