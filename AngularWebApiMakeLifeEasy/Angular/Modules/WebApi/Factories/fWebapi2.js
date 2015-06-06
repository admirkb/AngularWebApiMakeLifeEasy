(function () {
    'use strict';

    angular
        .module('appWebApi')
        .factory('fWebapi2', fWebapi2);

    fWebapi2.$inject = ['$resource'];

    function fWebapi2($resource) {
        var service = {

            manageAll: manageAll,
        };

        return service;

        function manageAll(table) {
            return $resource(
                '/api/' + table + '/:id',
                { id: '@id' },
                { "update": { method: "PUT" } },
                { "save": { method: "POST" } },
                { "remove": { method: "DELETE" } },
                { 'query': { method: 'GET', isArray: true } }
                );

        }

        

    }
})();