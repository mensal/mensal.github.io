var App = {

    contextPath: "https://despesas-despesas.a3c1.starter-us-west-1.openshiftapps.com",
    // contextPath: "http://localhost:8080",

    getParam: function (name) {
        return new URL(document.location).searchParams.get(name)
    },

    authToken: function () {
        return "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJjZWE4ZGMxNC0zZmJmLTQyOGUtODgxMi05NjY5NGEwMzFkZjMiLCJuYW1lIjoiQ2xldmVyc29uIiwiaXNzIjoiaHR0cDovL3Rlc3RlIiwiZXhwIjoxNTI2MzUzMjAwLCJpYXQiOjE1MjQ5OTY3ODN9.076zY3HlK5m3TLGbplQxV5p90D_ntg2MiCWXKAed0YrKlnIq76ruEBkkpRLZvOu_H-_z5uuAUe7DCPHssO8k7g";
    }
};

var params;