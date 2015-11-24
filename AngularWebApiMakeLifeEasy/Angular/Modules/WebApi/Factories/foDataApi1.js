
(function () {
    'use strict';

    angular
        .module('appWebApi')
        .factory('foDataApi1', foDataApi1);

    foDataApi1.$inject = ['$resource'];

    function foDataApi1($resource) {
        var service = {

            manageAll: manageAll,

        };

        return service;

        function manageAll(table) {
            var odataUrl = "/odata/oData" + table;
            return $resource("", {},
            {
                'getAll': { method: "GET", url: odataUrl },
                'save': { method: "POST", url: odataUrl },
                'update': { method: 'PUT', params: { key: "@key" }, url: odataUrl + "(:key)" },
                'query': { method: 'GET', params: { key: "@key" }, url: odataUrl + "(:key)" },
                'remove': { method: 'DELETE', params: { key: "@key" }, url: odataUrl + "(:key)" }
            });

        }


    }
})();