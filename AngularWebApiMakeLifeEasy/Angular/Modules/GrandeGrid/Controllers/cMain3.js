(function () {
    'use strict';

    angular
        .module('appAdmirMain')
        .controller('cMain3', cMain3);

    cMain3.$inject = ['$scope', 'fWebapi2', '$rootScope', '$compile'];

    function cMain3($scope, fWebapi2, $rootScope, $compile) {

        $scope.searchTableName = "suppliers"
        $scope.serverOrderBy = "ContactName"
        $scope.serverFilter = "substringof('in' , ContactName )";
        $scope.serverSelectBy = "ContactName, Country";
        $scope.serverTopBy = "58";
        $scope.serverSkipBy = "0";

        $scope.serverOrderBy = ""
        $scope.serverFilter = "";
        $scope.serverSelectBy = "";


        $scope.orderByToggle = false;

        $scope.changeTable = function (tableName) {
            $scope.searchTableName = tableName;

            ////var upperCaseFirstLetterOrderBy = orderBy[0].toUpperCase() + orderBy.slice(1);
            ////$scope.serverOrderBy = upperCaseFirstLetterOrderBy;

            ////console.log("----------")

            ////console.log($scope.o[orderBy]['orderBy'])
            ////$scope.o[orderBy]['orderBy'] = !$scope.o[orderBy]['orderBy'];
            ////console.log($scope.o[orderBy]['orderBy'])

            ////console.log("----------")


            //////$scope.orderByToggle = $scope.o[$scope.selectBy]['orderBy'];

            ////var sortType = ($scope.o[orderBy]['orderBy'] == true) ? ' desc' : ' asc';

            ////$scope.serverOrderBy = upperCaseFirstLetterOrderBy + sortType;
            ////console.log($scope.serverOrderBy)
            activate();
        }


        $scope.$on('fWebapi2.manageAll.query', function (e, eo) {

            //$scope[eo.tableName + 'List'] = eo.data
            $scope.data = eo.data

            //$scope.kjb = eo.data;




        });

        //activate();

        function activate() {

            console.log("appAdmirMain.activate called");


            var t = new Object();
            t.tableName = $scope.searchTableName;
            t.orderBy = $scope.serverOrderBy;
            t.filterBy = $scope.serverFilter;
            t.topBy = $scope.serverTopBy;
            t.skipBy = $scope.serverSkipBy;
            t.selectBy = $scope.serverSelectBy;

            var oDataParams = new Object();
            oDataParams.$orderby = (t.orderBy != "") ? (t.orderBy == '$id') ? null : t.orderBy : null;
            oDataParams.$filter = (t.filterBy != "") ? t.filterBy : null;
            oDataParams.$top = (t.topBy != "") ? t.topBy : null;
            oDataParams.$skip = (t.skipBy != "") ? t.skipBy : null;
            oDataParams.$select = (t.selectBy != "") ? t.selectBy : null;

            console.log(oDataParams)

            fWebapi2.manageAll(t.tableName).query(oDataParams).$promise.then(function (data) {
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

        }
    }
})();
