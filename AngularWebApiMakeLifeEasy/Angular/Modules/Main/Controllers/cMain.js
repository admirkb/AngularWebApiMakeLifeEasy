(function () {
    'use strict';

    angular
        .module('appAdmirMain')
        .controller('cMain', cMain);

    cMain.$inject = ['$scope'];

    function cMain($scope) {

        var vm = this;
        vm.title = 'cMain';

        $scope.$on('fWebapi2.manageAll.query', function (e, eo) {

            $scope[eo.tableName + 'List'] = eo.data

            //switch (eo.tableName) {
            //    case 'customers':
            //        $scope.customersList = eo.data
            //        break;
            //    case 'suppliers':
            //        $scope.suppliersList = eo.data
            //        break;
            //    case 'bands':
            //        $scope.bandsList = eo.data
            //        break; default:
            //        // 
            //}


        });

        activate();

        function activate() {

            console.log("appAdmirMain.activate called");
        }
    }
})();
