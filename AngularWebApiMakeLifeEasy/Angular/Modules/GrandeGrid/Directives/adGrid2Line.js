(function() {
    'use strict';

    angular
        .module('appWebApi')
        .directive('adGrid2Line', adGrid2Line);

    adGrid2Line.$inject = ['$window'];
    
    function adGrid2Line ($window) {


        var directive = {
            link: link,
            restrict: 'E',
            templateUrl: 'Angular/Modules/GrandeGrid/Directives/html/adGridLine.html',
            scope: {
                p: "=",
                o: "=",
                keys: "=",
            },
        };
        return directive;

        function link(scope, element, attrs) {

            console.dir(scope.p)
            console.dir(scope.keys)
            console.dir(scope.o)

            scope.isEditable = false;
            scope.isDisabled = false;

            scope.Edit = function () {
                scope.isEditable = true;
            }
            scope.Cancel = function () {
                scope.isEditable = false;
            }
            scope.Update = function (p, keyp) {

                console.dir(p);

                console.log('Modal says you want to update: ' + new Date());

                var customer = p;
                var customerId = p.customerId;

                fWebapi2.manageAll("customers").update({ id: customerId }, customer).$promise.then(function (p) {
                    console.log('Success - update customers')
                    console.dir(p)
                    console.log('Success - update customers')

                    var eo = new Object();
                    eo.time = new Date();

                    //scope.$emit("adMediaUpload.DeleteFile", eo);
                }, function (err) {
                    console.log('Error- update customers: ' + err.status + ' - ' + err.statusText)
                });


                scope.isEditable = false;


                var eo = new Object();
                eo.time = new Date();
                eo.thedata = scope.thedata;

                // Best update at higher level
                //scope.$emit("adSmallImageLine.Update", eo);

            }
            scope.Delete = function () {
                scope.isEditable = false;

                var eo = new Object();
                eo.time = new Date();
                eo.thedata = scope.thedata;

                // Best delete at higher level
                //scope.$emit("adSmallImageLine.Delete", eo);



            }
            scope.Run = function () {

                var eo = new Object();
                eo.time = new Date();
                //eo.thedata = scope.thedata;

                //var size = 'lg';
                //var modalInstance = $modal.open({
                //    backdrop: 'static',
                //    templateUrl: 'Angular/Modules/GrandeGrid/Directives/html/ProductsModal.html',
                //    controller: 'cProductsMaintModalInstanceCtrl',
                //    size: size,
                //    resolve: {
                //        modalScope: function () { return scope; },
                //    }
                //});
                //modalInstance.result.then(function (res) {
                //    //alert(res.modalScope.name)
                //    //alert(res.modalScope.testName)
                //    //scope.name = res.modalScope.name;

                //    console.dir(res.modalScope);
                //    console.log('Modal says you want to update: ' + new Date());

                //    // Updates taken place
                //    // Best delete at higher level

                //    var eo = new Object();
                //    eo.time = new Date();
                //    eo.thedata = res.modalScope.thedata
                //    eo.tags = res.modalScope.thedata.tags;
                //    eo.tableArea = res.modalScope.selectedProductArea

                //    if (eo.thedata.image != null) {

                //        scope.$emit("adMediaUpload.UploadFile", eo);
                //    }

                //    scope.$emit("adSmallImageLine.Update", eo);





                //});


            }

        }
    }

})();