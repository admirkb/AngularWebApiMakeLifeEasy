(function() {
    'use strict';

    angular
        .module('appWebApi')
        .directive('adGrid2', adGrid2);

    adGrid2.$inject = ['$compile', '$filter', 'fWebapi2'];
    
    function adGrid2($compile, $filter,fWebapi2 ) {


        var directive = {
            compile: compile,
            templateUrl: 'Angular/Modules/GrandeGrid/Directives/html/adGridHeader.html',
            restrict: 'E',
 
        };
        return directive;
        var template = '<div></div>';


        function compile(element, attributes) {


            function theStuff(scope, elem, attrs, controller, transcludeFn) {


                scope.$on('fWebapi2.manageAll.query', function (e, eo) {

                    scope.data = eo.data;
                    scope.keys = Object.keys(eo.data[0]);
        
                    // Set up object for each column to hold some properties for it
                    scope.o = new Object();
                    angular.forEach(scope.keys, function (k, keyk) {
                        scope.o[k] = new Object();
                        scope.o[k]['orderBy'] = false;
                        scope.o[k]['filterBy'] = '';
                    });

                    //var keys = Object.keys(eo.data[0])
                    //scope[eo.tableName + 'List'] = eo.data;
                    //scope.keys = keys;


                });


                scope.$on('fWebapi2.manageAll.query-old', function (e, eo) {
           
                    var properties = {
                        contactName: [{ displayName: 'Contact Name', displayColor: 'red' }],
                        country: [{ displayName: 'Country', displayColor: 'red' }],
                        customerId: [{ displayName: 'Id', displayColor: 'red' }],
                        companyName: [{ displayName: 'Company', displayColor: 'red' }],

                    }
                    console.dir(properties)

                    console.log(properties['contactName'][0]['displayName'])
                    console.log(properties['contactName'][0]['displayColor'])

                    var template = "<button ng-click='IncLeft(1)'>1234</button>";
                    //var linkFn = $compile(template);
                    //var content = linkFn(scope);
                    //elem.append(content);

                    var keys = Object.keys(eo.data[0])
                    scope[eo.tableName + 'List'] = eo.data;
                    scope.keys = keys;

                    console.dir(keys)


                    var html1 = "<table>"
                    var clientOrderBy = ' | orderBy: "-companyName"';
                    clientOrderBy = "";
                    var clientFilter = " | filter: { 'companyName': 'Pepsi' }";
                    clientFilter = "";
                    var html11 = "<tr data-ng-repeat='(keyp, p) in kjb" + clientOrderBy + clientFilter + "'>";
                    //var html11 = "<tr data-ng-repeat='(keyp, p) in kjb'>";
                    //var html12 = "<td >{{p.contactName}}</td><td >{{p.companyName}}</td>";
                    var html12 = "";
                    var html12Tot = "";
                    var html3 = "</tr></table>"

                    var th = "";
                    var thTot = "";

                    var tdd = "";
                    var tddTot = "";

                    var td = "";
                    var tdTot = "";


                    // Set up object for each column to hold some properties for it
                    scope.o = new Object();


                    angular.forEach(keys, function (k, keyk) {

                        // look for k in the array

                        //var displayName = properties[k][0]['displayName']
                        var kDisplay = "";
                        if (properties[k] != null) {

                            kDisplay = properties[k][0]['displayName'];
                        }
                        else {
                            kDisplay = k;
                        }

                        th = "<th style='text-align:left;background-color:red;' ng-click='changeClientOrderBy(" + keyk + ")'   >" + kDisplay + "</th>";
                        thTot = thTot + th;

                        tdd = "<td style='text-align:left'><input type='text'" + " value='Goodnight' /></td>";
                        tddTot = tddTot + tdd;

                        // Set up object for each column to hold some properties for it
                        scope.o[k] = new Object();
                        scope.o[k]['orderBy'] = false;
                        scope.o[k]['filterBy'] = '';

                        // row detail line
                        if (k == "contactName") {
                            html12 = "<td><div ng-bind=" + "p." + k + "" + " ></div></td>";
                        }
                        else {
                            //html12 = "<td><input type='text' ng-model=" + "p." + k + "" + " ></input></td>";
                            html12 = "<td><div ng-bind=" + "p." + k + "" + " ></div></td>";
                        }


                        html12Tot = html12Tot + html12;


                    });

                    var editButton = "<td><button ng-click='edit(this)'   >Edit</button></td>";
                    var deleteButton = "<td><button ng-click='delete(this)'   >Delete</button></td>";
                    var updateButton = "<td><button ng-click='update(this)'   >Update</button></td>";




                        tddTot = "<tr>" + tddTot + "</tr>";
          
                        template = html1 + thTot + tddTot + html11 + html12Tot + html3;
                        //template = html1 + thTot + tddTot + html11 + html12Tot + updateButton + editButton + deleteButton + html3;


                    console.dir(template)
                    var linkFn = $compile(template);
                    var content = linkFn(scope);
                    elem.html("");
                    elem.append(content);

             
          

                });



                $.event.trigger({ type: "StartUpEvent", message: "Start Up Event", time: new Date() });

            }


            return {
                pre: function (scope, elem, attrs, controller, transcludeFn) {

                    scope.defaultHeight = 90;
                    scope.defaultWidth = 160;

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

                            //$scope.$emit("adMediaUpload.DeleteFile", eo);
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

                    scope.changeClientOrderBy = function (index) {

                        var orderByColumnName = scope.keys[index];
                        var directionToggle = scope.o[orderByColumnName]['orderBy'] = !scope.o[orderByColumnName]['orderBy'];
  
                        var direction = (directionToggle == true) ? '' : 'reverse';
                        scope.data = $filter('orderBy')(scope.data, orderByColumnName, direction);

                    }



                    theStuff(scope, elem, attrs, controller, transcludeFn)
                    console.log("compile.pre")

                },
                post: function (scope, elem, attrs, controller, transcludeFn) {

                    scope.edit = function (t) {

                        console.log("edit" + t);

                    }

                    scope.delete = function (t) {

                        console.dir(t.p);

                        console.log('Modal says you want to delete: ' + new Date());

                        var customerId = t.p.customerId;

                        fWebapi2.manageAll("customers").delete({ id: customerId }).$promise.then(function (p) {
                            console.log('Success - delete customers')
                            console.dir(p)
                            console.log('Success - delete customers')

                            var eo = new Object();
                            eo.time = new Date();

                            //$scope.$emit("adMediaUpload.DeleteFile", eo);
                        }, function (err) {
                            console.log('Error- delete customers: ' + err.status + ' - ' + err.statusText)
                        });




                    }

                    scope.update = function (t) {

                        console.dir(t.p);

                        console.log('Modal says you want to update: ' + new Date());

                        var customer = t.p;
                        var customerId = t.p.customerId;

                        fWebapi2.manageAll("customers").update({ id: customerId }, customer ).$promise.then(function (p) {
                            console.log('Success - update customers')
                            console.dir(p)
                            console.log('Success - update customers')

                            var eo = new Object();
                            eo.time = new Date();

                            //$scope.$emit("adMediaUpload.DeleteFile", eo);
                        }, function (err) {
                            console.log('Error- update customers: ' + err.status + ' - ' + err.statusText)
                        });




                    }

                    console.log("compile.post")

                    //scope.$on('$includeContentLoaded', function () {

  
                    //    console.log("compile.post.$includeContentLoaded")

                    //});

  

                }
            }
        }

    }

})();