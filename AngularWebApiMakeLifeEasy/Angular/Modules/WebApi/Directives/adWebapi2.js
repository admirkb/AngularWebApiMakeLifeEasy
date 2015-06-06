(function () {
    'use strict';

    angular
        .module('appWebApi')
        .directive('adWebapi2', adWebapi2);

    adWebapi2.$inject = ['fWebapi2', '$timeout'];

    function adWebapi2(fWebapi2, $timeout) {

        var directive = {
            scope: { id: '@', tables: '@' },
            link: link,
            controller: controller,
            restrict: 'E',
        };
        return directive;

        function link(scope, element, attrs) {


        }


        function controller($scope, $element, $attrs) {

            console.log("in webap2i controller")
            var tables = angular.fromJson(eval("(" + $scope.tables + ")"))

            angular.forEach(tables, function (t, keyt) {

                var oDataParams = new Object();
                oDataParams.$orderby = t.orderBy;
                oDataParams.$filter = t.filterBy
                oDataParams.$top = t.topBy
                oDataParams.$skip = t.skipBy
                console.log(oDataParams)

                fWebapi2.manageAll(t.tableName).query().$promise.then(function (data) {
                    console.log('Success - query manageAll')
                    console.dir(data)
                    console.log('Success - query manageAll')

                    var eo = new Object();
                    eo.time = new Date();
                    eo.data = data;
                    eo.tableName = t.tableName;
                    console.log('emit fWebapi2.manageAll.query')
                    $scope.$emit("fWebapi2.manageAll.query", eo);


                }, function (err) {
                    console.log('Error- query manageAll: ' + err.status + ' - ' + err.statusText)
                });





            });

        }




    }

})();