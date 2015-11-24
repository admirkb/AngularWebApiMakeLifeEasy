(function () {
    'use strict';

    angular
        .module('appWebApi')
        .controller('cMain', cMain);

    cMain.$inject = ['$scope'];

    function cMain($scope) {

        var vm = this;
        vm.title = 'cMain';

        $scope.stockValue = 0;

        activate();

        function activate() {

            console.log("appAdmirMain.activate called in cMain");
        }
    }
})();
