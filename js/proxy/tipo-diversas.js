var TipoDiversasProxy = {

    url: App.contextPath + "/api/tipo/diversas",

    buscar: function (mes, ano) {
        return $.ajax({
            type: "GET",
            url: this.url,
            headers: {
                Authorization: "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJjZWE4ZGMxNC0zZmJmLTQyOGUtODgxMi05NjY5NGEwMzFkZjMiLCJuYW1lIjoiQ2xldmVyc29uIiwiaXNzIjoiaHR0cDovL3Rlc3RlIiwiZXhwIjoxNTI0MDA3MTMzLCJpYXQiOjE1MjM1NzUxMzN9.pkLAf2ExY7gBaJRIpWW3vwkSKsctyJFjqCXB8oFIdjm7tQMI2e6nmmhGVWQwXd_djsULBs0t2N0egT-eIazIwA"
            }
        });
    },
}