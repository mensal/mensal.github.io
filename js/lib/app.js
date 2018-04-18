var App = {

    contextPath: "https://despesas-despesas.a3c1.starter-us-west-1.openshiftapps.com",
    // contextPath: "http://localhost:8080",

    getParam: function (name) {
        return new URL(document.location).searchParams.get(name)
    },

    authToken: function () {
        return "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJjZWE4ZGMxNC0zZmJmLTQyOGUtODgxMi05NjY5NGEwMzFkZjMiLCJuYW1lIjoiQ2xldmVyc29uIiwiaXNzIjoiaHR0cDovL3Rlc3RlIiwiZXhwIjoxNTI0ODcxNDU0LCJpYXQiOjE1MjM1NzUxMzN9.RCk6ppTsXF40btts7qXUphmqutB6VC7ibDN0bDuCpwYSbqfvXtihQHy4htJ_NQAZocFdGOJ3x9Zew2TGk0PTYQ";
    }
};

var params;