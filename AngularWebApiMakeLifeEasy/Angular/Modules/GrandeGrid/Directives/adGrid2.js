(function() {
    'use strict';

    angular
        .module('appWebApi')
        .directive('adGrid2', adGrid2)
        .controller('adGridModalInstanceCtrl', adGridModalInstanceCtrl)
        .controller('adGridClientModalInstanceCtrl', adGridClientModalInstanceCtrl);

    adGrid2.$inject = ['$compile', '$filter', 'fWebapi2', '$modal'];
    
    function adGrid2($compile, $filter,fWebapi2, $modal ) {


        var directive = {
            compile: compile,
            templateUrl: 'Angular/Modules/GrandeGrid/Directives/html/adGridHeader.html',
            restrict: 'E',
            scope: { targetTable: "@", },
 
        };
        return directive;
        var template = '<div></div>';

        function startUp(scope) {




            scope.searchTableName = scope.targetTable;
            scope.serverOrderBy = "ContactName"
            scope.serverFilter = "substringof('in' , ContactName )";
            scope.serverSelectBy = "ContactName, Country";
            scope.serverTopBy = "100";
            scope.serverSkipBy = "0";

            scope.serverOrderBy = ""
            scope.serverFilter = "";
            scope.serverSelectBy = "";


            var propertiesTableObjectName = "properties_" + scope.searchTableName + "Object";
            window.localStorage.setItem(propertiesTableObjectName, null);

            ////scope.setLocalStoragePropertiesObject = function (tableName, propertiesObject) {
            ////    window.localStorage.setItem(tableName, angular.toJson(propertiesObject));
            ////}
            ////scope.getLocalStoragePropertiesObject = function (tableName) {
            ////    return angular.fromJson(localStorage.getItem(tableName));
            ////}

            ////var serverSelectByString = "";
            ////var serverOrderByString = "";

            ////scope.propertiesObject = scope.getLocalStoragePropertiesObject(propertiesTableObjectName);
            ////angular.forEach(scope.propertiesObject.propertiesList, function (p, keyp) {

            ////    var upperCaseFirstLetterSelectBy = p.columnName[0].toUpperCase() + p.columnName.slice(1);

            ////    if (p.selectedSelectValue == true) {
            ////        serverSelectByString = serverSelectByString + upperCaseFirstLetterSelectBy + ","
            ////    }
            ////});

            ////scope.serverSelectBy = serverSelectByString;
            ////serverOrderByString = serverOrderByString.replace(/,\s*$/, "");
            ////scope.serverOrderBy = serverOrderByString;
            ////console.dir(scope.serverOrderBy);


            ////// Client start up properties

            var propertiesClientTableObjectName = "propertiesClient_" + scope.searchTableName + "Object";
            window.localStorage.setItem(propertiesClientTableObjectName, null);
            ////scope.clientOrderBy = ""
            ////var clientOrderByString = "";

            ////scope.clientPropertiesObject = scope.getLocalStoragePropertiesObject(propertiesClientTableObjectName);
            ////if (scope.clientPropertiesObject != null) {

            ////    clientOrderByString = clientOrderByString.replace(/,\s*$/, "");
            ////    scope.clientOrderBy = clientOrderByString;
            ////    console.dir(scope.clientOrderBy);

            ////}


        }
        function compile(element, attributes) {
        function    paging(scope){

                scope.totalItems = 0;
                scope.currentPage = 1;
                scope.maxSize = 15;
                scope.tags = "";
                scope.itemsPerPage = 8;

                scope.setPage = function (pageNo) {
                    scope.currentPage = pageNo;
                };
                scope.next = function () {

                    //activate();
                };

                scope.pageChanged = function () {
    

                    var limit = scope.itemsPerPage;
                    var begin = scope.itemsPerPage * (scope.currentPage - 1);
                    scope.data = $filter('limitTo')(scope.dataFull, limit, begin);
                    //activate();

                    console.log('Page changed to: ' + scope.currentPage + " - limit: " + limit + " - begin: " + begin);


                };

                scope.$watch('itemsPerPage', function () {

                    scope.maxSize = (scope.totalItems / scope.itemsPerPage) + 1;

                    var limit = scope.itemsPerPage;
                    var begin = scope.itemsPerPage * (scope.currentPage - 1);
                    scope.data = $filter('limitTo')(scope.dataFull, limit, begin);
                });

            }
        function activate(scope) {

            console.log("appAdmirMain.activate called");



            var t = new Object();
            t.tableName = scope.searchTableName;
            t.orderBy = scope.serverOrderBy;
            t.filterBy = scope.serverFilter;
            t.topBy = scope.serverTopBy;
            t.skipBy = scope.serverSkipBy;
            t.selectBy = scope.serverSelectBy;

            var oDataParams = new Object();
            oDataParams.$orderby = (t.orderBy != "") ? (t.orderBy == '$id') ? null : t.orderBy : null;
            //oDataParams.$filter = (t.filterBy != "") ? t.filterBy : null;
            //oDataParams.$top = (t.topBy != "") ? t.topBy : null;
            //oDataParams.$skip = (t.skipBy != "") ? t.skipBy : null;
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
                scope.$emit("fWebapi2.manageAll.query", eo);
                console.log('emit fWebapi2.manageAll.query')


            }, function (err) {
                console.log('Error- query manageAll: ' + err.status + ' - ' + err.statusText)
            });

        }
        function theStuff(scope, elem, attrs, controller, transcludeFn) {

                scope.keysFull = null;
                scope.$on('fWebapi2.manageAll.query', function (e, eo) {


                    scope.dataFull = eo.data;
                    scope.data = eo.data;
                    scope.keys = Object.keys(eo.data[0]);
                    scope.keysFull = (scope.keysFull == null) ? scope.keys : scope.keysFull;

        
                    // Set up object for each column to hold some properties for it
                    scope.o = new Object();
                    angular.forEach(scope.keysFull, function (k, keyk) {

                        var searchObj = new Object();
                        var s = scope.clientPropertiesObject;
                        searchObj[k] = "";
                        //scope.data = $filter('filter')(scope.data, { companyName: 'Admir' , contactName: 'Kelvin' }, 'strict');
                        var found = $filter('filter')(s.propertiesList, { columnName: k }, 'strict');

                        if (found.length != 0) {

                            scope.o[k] = new Object();

                            scope.o[k]['displayName'] = (found[0]['displayName'] != null) ? found[0]['displayName'] : k;


                            /* Headers - Start */

                            scope.o[k]['fontFamilyH'] = found[0]['fontFamilyH']
                            scope.o[k]['fontSizeH'] = found[0]['fontSizeH']
                            scope.o[k]['fontWeightH'] = found[0]['fontWeightH']
                            scope.o[k]['fontStyleH'] = found[0]['fontStyleH']
                            scope.o[k]['colorH'] = found[0]['colorH']
                            scope.o[k]['bgColorH'] = found[0]['bgColorH']
                            scope.o[k]['widthH'] = (found[0]['widthH'] != null) ? found[0]['widthH'] : "100%";
                            scope.o[k]['heightH'] = (found[0]['heightH'] != null) ? found[0]['heightH'] : "20px";

                            scope.o[k]['overflowH'] = found[0]['overflowH']
                            scope.o[k]['whiteSpaceH'] = found[0]['whiteSpaceH']
                            scope.o[k]['textDecorationH'] = found[0]['textDecorationH']
                            scope.o[k]['textAlignH'] = found[0]['textAlignH']

                            // Borders
                            scope.o[k]['borderBottomColorH'] = found[0]['borderBottomColorH']
                            scope.o[k]['borderTopColorH'] = found[0]['borderTopColorH']
                            scope.o[k]['borderLeftColorH'] = found[0]['borderLeftColorH']
                            scope.o[k]['borderRightColorH'] = found[0]['borderRightColorH']
                            scope.o[k]['borderBottomStyleH'] = found[0]['borderBottomStyleH']
                            scope.o[k]['borderTopStyleH'] = found[0]['borderTopStyleH']
                            scope.o[k]['borderLeftStyleH'] = found[0]['borderLeftStyleH']
                            scope.o[k]['borderRightStyleH'] = found[0]['borderRightStyleH']
                            scope.o[k]['borderBottomWidthH'] = found[0]['borderBottomWidthH']
                            scope.o[k]['borderTopWidthH'] = found[0]['borderTopWidthH']
                            scope.o[k]['borderLeftWidthH'] = found[0]['borderLeftWidthH']
                            scope.o[k]['borderRightWidthH'] = found[0]['borderRightWidthH']
                            scope.o[k]['borderBottomLeftRadiusH'] = found[0]['borderBottomLeftRadiusH']
                            scope.o[k]['borderTopLeftRadiusH'] = found[0]['borderTopLeftRadiusH']
                            scope.o[k]['borderLeftLeftRadiusH'] = found[0]['borderLeftLeftRadiusH']
                            scope.o[k]['borderRightLeftRadiusH'] = found[0]['borderRightLeftRadiusH']
                            scope.o[k]['borderBottomRightRadiusH'] = found[0]['borderBottomRightRadiusH']
                            scope.o[k]['borderTopRightRadiusH'] = found[0]['borderTopRightRadiusH']
                            scope.o[k]['borderLeftRightRadiusH'] = found[0]['borderLeftRightRadiusH']
                            scope.o[k]['borderRightRightRadiusH'] = found[0]['borderRightRightRadiusH']


                            /* Headers - End */


                            scope.o[k]['fontFamily'] = found[0]['fontFamily']
                            scope.o[k]['fontSize'] = found[0]['fontSize']
                            scope.o[k]['fontWeight'] = found[0]['fontWeight']
                            scope.o[k]['fontStyle'] = found[0]['fontStyle']
                            scope.o[k]['color'] = found[0]['color']
                            scope.o[k]['bgColor'] = found[0]['bgColor']
                            scope.o[k]['width'] = (found[0]['width'] != null) ? found[0]['width'] : "100%";
                            scope.o[k]['height'] = (found[0]['height'] != null) ? found[0]['height'] : "10px";


                            scope.o[k]['overflow'] = found[0]['overflow']
                            scope.o[k]['whiteSpace'] = found[0]['whiteSpace']
                            scope.o[k]['textDecoration'] = found[0]['textDecoration']
                            scope.o[k]['textAlign'] = found[0]['textAlign']



                            // Borders
                            scope.o[k]['borderBottomColor'] = found[0]['borderBottomColor']
                            scope.o[k]['borderTopColor'] = found[0]['borderTopColor']
                            scope.o[k]['borderLeftColor'] = found[0]['borderLeftColor']
                            scope.o[k]['borderRightColor'] = found[0]['borderRightColor']
                            scope.o[k]['borderBottomStyle'] = found[0]['borderBottomStyle']
                            scope.o[k]['borderTopStyle'] = found[0]['borderTopStyle']
                            scope.o[k]['borderLeftStyle'] = found[0]['borderLeftStyle']
                            scope.o[k]['borderRightStyle'] = found[0]['borderRightStyle']
                            scope.o[k]['borderBottomWidth'] = found[0]['borderBottomWidth']
                            scope.o[k]['borderTopWidth'] = found[0]['borderTopWidth']
                            scope.o[k]['borderLeftWidth'] = found[0]['borderLeftWidth']
                            scope.o[k]['borderRightWidth'] = found[0]['borderRightWidth']
                            scope.o[k]['borderBottomLeftRadius'] = found[0]['borderBottomLeftRadius']
                            scope.o[k]['borderTopLeftRadius'] = found[0]['borderTopLeftRadius']
                            scope.o[k]['borderLeftLeftRadius'] = found[0]['borderLeftLeftRadius']
                            scope.o[k]['borderRightLeftRadius'] = found[0]['borderRightLeftRadius']
                            scope.o[k]['borderBottomRightRadius'] = found[0]['borderBottomRightRadius']
                            scope.o[k]['borderTopRightRadius'] = found[0]['borderTopRightRadius']
                            scope.o[k]['borderLeftRightRadius'] = found[0]['borderLeftRightRadius']
                            scope.o[k]['borderRightRightRadius'] = found[0]['borderRightRightRadius']

                   
                        }



                    });

                    scope.totalItems = eo.data.length;
                    scope.maxSize = (scope.totalItems / scope.itemsPerPage) + 1;

                    var limit = scope.itemsPerPage;
                    var begin = scope.itemsPerPage * (scope.currentPage - 1);
                    scope.data = $filter('limitTo')(scope.dataFull, limit, begin);

                    angular.forEach(scope.data, function (d, keyd) {

                        d.isEditable = false;
                        d.isDisabled = false;

                        d.Edit = function () {
                          
                            d.isEditable = true;
                            console.dir(d)
                        }
                        d.Cancel = function () {
                            d.isEditable = false;
                            console.dir(d)
                        }
                        d.Update = function (p, keyp) {

                            d.isEditable = false;
                            console.dir(d)

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
                                alert('Error- update customers: ' + err.status + ' - ' + err.statusText)
                            });

                        }
                        d.Delete = function () {
                            d.isEditable = false;
                            console.dir(d)
                        }
                        d.Run = function () {
                            console.dir(d)

                        }

                        d.getColor = function (s,p,k,o) {

                            if (s.indexOf("?") != -1)
                            {
                                return eval(s);
                            }
                            else {
                                return s;

                            }
                        }

                        d.RunColChangeTest = function (p, keyp) {

                            p['supplierId'] = 1;
                            console.dir(d)

                        }


                    });

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

                    startUp(scope);



                    scope.changeTable = function (tableName) {
                        scope.keysFull = null;

                        scope.searchTableName = tableName;


                    }
                    scope.getProperties = function (tableName) {
                        scope.propertiesName = tableName;

                        // Fire up modal here

                        var size = 'lg';
                        var modalInstance = $modal.open({
                            backdrop: 'static',
                            templateUrl: 'Angular/Modules/GrandeGrid/Directives/html/adGridModal.html',
                            controller: 'adGridModalInstanceCtrl',
                            size: size,
                            resolve: {
                                modalScope: function () { return scope; },
                            }
                        });

                        modalInstance.result.then(function (res) {

                            console.log('Modal says you want to update: ' + new Date());
                            var eo = new Object();
                            eo.time = new Date();

                            var serverSelectByString = "";
                            var serverOrderByString = "";
    
                            angular.forEach(res.modalScope.propertiesObject.propertiesList, function (p, keyp) {

                                var upperCaseFirstLetterSelectBy = p.columnName[0].toUpperCase() + p.columnName.slice(1);

                                console.log(upperCaseFirstLetterSelectBy);
                                if (p.selectedSelectValue == true) {
                                    serverSelectByString = serverSelectByString + upperCaseFirstLetterSelectBy + ","
                                }

                            });


                            scope.serverSelectBy = serverSelectByString;
                            serverOrderByString = serverOrderByString.replace(/,\s*$/, "");
                            scope.serverOrderBy = serverOrderByString;
                            console.dir(scope.serverOrderBy);


                            activate(scope);
                            //scope.$emit("adSmallImageLine.Update", eo);





                        });


                    }
                    scope.getClientProperties = function (tableName) {

                        // Fire up modal here

                        var size = 'lg';
                        var modalInstance = $modal.open({
                            backdrop: 'static',
                            templateUrl: 'Angular/Modules/GrandeGrid/Directives/html/adGridClientModal.html',
                            controller: 'adGridClientModalInstanceCtrl',
                            size: size,
                            resolve: {
                                modalScope: function () { return scope; },
                            },
                            windowClass: 'app-modal-window'
                        });

                        modalInstance.result.then(function (res) {

                            console.log('Modal says you want to update: ' + new Date());
                            var eo = new Object();
                            eo.time = new Date();

                        });



                    }

                    
                    activate(scope);


                    var searchObj = new Object();

                    scope.defaultHeight = 90;
                    scope.defaultWidth = 160;

                    scope.changeClientOrderBy = function (index) {

                        var orderByColumnName = scope.keys[index];
                        var directionToggle = scope.o[orderByColumnName]['orderBy'] = !scope.o[orderByColumnName]['orderBy'];
  
                        var direction = (directionToggle == true) ? '' : 'reverse';
                        scope.data = $filter('orderBy')(scope.data, orderByColumnName, direction);

                    }



                    // Paging

                    paging(scope);

                    scope.Test = function (colName, colValue) {

                        var eo = new Object();
                        eo.time = new Date();

                        //var searchObj = new Object();
                        // built up with every run, should contain the complete list of where fields and values
                        searchObj[colName] = colValue;

                        //scope.data = $filter('filter')(scope.data, { companyName: 'Admir' , contactName: 'Kelvin' }, 'strict');


                        scope.data = $filter('filter')(scope.dataFull, searchObj , 'strict');

                        scope.totalItems = scope.data.length;
                        scope.maxSize = (scope.totalItems / scope.itemsPerPage) + 1;

                        var limit = scope.itemsPerPage;
                        var begin = scope.itemsPerPage * (scope.currentPage - 1);
                        scope.data = $filter('limitTo')(scope.data, limit, begin);

                    }


                    theStuff(scope, elem, attrs, controller, transcludeFn)
                    console.log("compile.pre")

                    scope.bgColorOdd = "#000000";
                    scope.bgColorEven = "#00002F";

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

                            //scope.$emit("adMediaUpload.DeleteFile", eo);
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

                            //scope.$emit("adMediaUpload.DeleteFile", eo);
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
    function adGridModalInstanceCtrl($scope, $modalInstance, modalScope, $filter) {

        function buildPropertiesObject(keys, top, skip) {

            var propertiesList = [];
            angular.forEach(keys, function (k, keyk) {
                var properties = new Object();
                properties.index = keyk
                properties.columnName = k
                properties.selectedSelectValue = true
                properties.selectedOrderByValue = false
                properties.selectedFilterByValue = false

                if (k != "$id") {
                    propertiesList.push(properties);
                }


            });

            var buildPropertiesObject = new Object();
            buildPropertiesObject.topBy = top;
            buildPropertiesObject.skipBy = skip;
            buildPropertiesObject.propertiesList = propertiesList;

            return buildPropertiesObject;
        }

        var propertiesTableObjectName = "properties_" + modalScope.searchTableName + "Object";

        $scope.setLocalStoragePropertiesObject = function (tableName, propertiesObject) {
            window.localStorage.setItem(tableName, angular.toJson(propertiesObject));
        }
        $scope.getLocalStoragePropertiesObject = function (tableName) {
            return angular.fromJson(localStorage.getItem(tableName));
        }


        $scope.keys = modalScope.keys;
        $scope.keysFull = modalScope.keysFull;


        //window.localStorage.setItem(propertiesTableObjectName, null);
        $scope.propertiesObject = $scope.getLocalStoragePropertiesObject(propertiesTableObjectName);

        if ($scope.propertiesObject == null) {
            $scope.setLocalStoragePropertiesObject(propertiesTableObjectName, buildPropertiesObject($scope.keys, 10, 0));
            $scope.propertiesObject = $scope.getLocalStoragePropertiesObject(propertiesTableObjectName);

        }
        $scope.o = modalScope.o;



        $scope.ok = function () {

            var res = new Object();
            res.modalScope = $scope;
            console.dir(res)
            window.localStorage.setItem(propertiesTableObjectName, null);
            $scope.setLocalStoragePropertiesObject(propertiesTableObjectName, $scope.propertiesObject);


            $modalInstance.close(res);
        };

        $scope.cancel = function () {


            $modalInstance.dismiss('cancel');
        };







        activate();

        function activate() {

            //alert("heyadGridModalInstanceCtrl")
        }
    }
    function getFonts() {

     var fonts = [
{ name: 'Arial', value: 'Arial' },
{ name: 'Arial Black', value: 'Arial Black' },
{ name: 'Arial Narrow', value: 'Arial Narrow' },
{ name: 'Arial Rounded MT Bold', value: 'Arial Rounded MT Bold' },
{ name: 'Avant Garde', value: 'Avant Garde' },
{ name: 'Calibri', value: 'Calibri' },
{ name: 'Candara', value: 'Candara' },
{ name: 'Century Gothic', value: 'Century Gothic' },
{ name: 'Franklin Gothic Medium', value: 'Franklin Gothic Medium' },
{ name: 'Futura', value: 'Futura' },
{ name: 'Geneva', value: 'Geneva' },
{ name: 'Gill Sans', value: 'CalGill Sansibri' },
{ name: 'Helvetica', value: 'Helvetica' },
{ name: 'Impact', value: 'Impact' },
{ name: 'Lucida Grande', value: 'Lucida Grande' },
{ name: 'Optima', value: 'Optima' },
{ name: 'Segoe UI', value: 'Segoe UI' },
{ name: 'Tangerine', value: 'Tangerine' },
{ name: 'Vampiro One', value: 'Vampiro One' },
{ name: 'Londrina Shadow', value: 'Londrina Shadow' },
{ name: 'Droid Sans', value: 'Droid Sans' },
{ name: 'Monofett', value: 'Monofett' },
{ name: 'Monoton', value: 'Monoton' },
{ name: 'Oleo Script Swash Caps', value: 'Oleo Script Swash Caps' },
{ name: 'Oswald', value: 'Oswald' },
{ name: 'UnifrakturMaguntia', value: 'UnifrakturMaguntia' },
{ name: 'Sancreek', value: 'Sancreek' },
{ name: 'Trocchi', value: 'Trocchi' },
{ name: 'Six Caps', value: 'Six Caps' },
{ name: 'Yesteryear', value: 'Yesteryear' },
{ name: 'Revalia', value: 'Revalia' },
{ name: 'Esteban', value: 'Esteban' },
{ name: 'Condiment', value: 'Condiment' },
{ name: 'Flamenco', value: 'Flamenco' },
{ name: 'Alegreya Sans SC', value: 'Alegreya Sans SC' },
{ name: 'Fanwood Text', value: 'Fanwood Text' },
{ name: 'Sigmar One', value: 'Sigmar One' },
{ name: 'Bubbler One', value: 'Bubbler One' },
{ name: 'Sail', value: 'Sail' },
{ name: 'Arizonia', value: 'Arizonia' },
{ name: 'Diplomata', value: 'Diplomata' },
{ name: 'Engagement', value: 'Engagement' },
{ name: 'Oregano', value: 'Oregano' },
{ name: 'Codystar', value: 'Codystar' },
{ name: 'Parisienne', value: 'Parisienne' },
{ name: 'Bad Script', value: 'Bad Script' },
{ name: 'Quattrocento', value: 'Quattrocento' },
{ name: 'Astloch', value: 'Astloch' },
{ name: 'Satisfy', value: 'Satisfy' },
{ name: 'Niconne', value: 'Niconne' },
{ name: 'Almendra SC', value: 'Almendra SC' },
{ name: 'Cinzel', value: 'Cinzel' },
{ name: 'UnifrakturCook', value: 'UnifrakturCook' },
{ name: 'Lobster Two', value: 'Lobster Two' },
{ name: 'Calligraffittio', value: 'Calligraffittio' },

        ];
        return fonts;
    }
    function getFontStyles() {

        var fontStyles = [
            { name: 'normal', value: 'normal' },
            { name: 'italic', value: 'italic' },
            { name: 'oblique', value: 'oblique' },
            { name: 'inherit', value: 'inherit' },

        ];

        return fontStyles;

    }
    function getFontWeights() {

     var fontWeights = [
    { name: 'normal', value: 'normal' },
    { name: 'bold', value: 'bold' },
    { name: 'bolder', value: 'bolder' },
    { name: 'lighter', value: 'lighter' },

        ];


     return fontWeights;

    }
    function getBorderStyles() {

        var borderStyles = [
{ name: 'none', value: 'none' },
{ name: 'dotted', value: 'dotted' },
{ name: 'dashed', value: 'dashed' },
{ name: 'solid', value: 'solid' },
{ name: 'double', value: 'double' },
{ name: 'groove', value: 'groove' },
{ name: 'ridge', value: 'ridge' },
{ name: 'inset', value: 'inset' },
{ name: 'outset', value: 'outset' },
{ name: 'inherit', value: 'inherit' },

        ];



        return borderStyles;

    }
    function getOverflows() {

        var overflows = [
{ name: 'visible', value: 'visible' },
{ name: 'hidden', value: 'hidden' },
{ name: 'scroll', value: 'scroll' },
{ name: 'auto', value: 'auto' },
{ name: 'inherit', value: 'inherit' },

        ];



        return overflows;

    }
    function getWhiteSpaces() {

        var whiteSpaces = [
{ name: 'normal', value: 'normal' },
{ name: 'nowrap', value: 'nowrap' },
{ name: 'pre', value: 'pre' },
{ name: 'pre-line', value: 'pre-line' },
{ name: 'pre-wrap', value: 'pre-wrap' },
{ name: 'inherit', value: 'inherit' },

        ];



        return whiteSpaces;

    }
    function getTextDecorations() {

        var textDecorations = [
            { name: 'none', value: 'none' },
            { name: 'underline', value: 'underline' },
            { name: 'overline', value: 'overline' },
            { name: 'inherit', value: 'inherit' },
            { name: 'line-through', value: 'line-through' },
            { name: 'underline', value: 'underline' },

        ];

        return textDecorations;

    }
    function getTextAligns() {

        var textAligns = [
            { name: 'left', value: 'left' },
            { name: 'right', value: 'right' },
            { name: 'center', value: 'center' },
            { name: 'justify', value: 'justify' },
            { name: 'inherit', value: 'inherit' },

        ];

        return textAligns;

    }


    function adGridClientModalInstanceCtrl($scope, $modalInstance, modalScope, $filter) {

        $scope.fonts = getFonts();
        $scope.fontStyles = getFontStyles();
        $scope.fontWeights = getFontWeights();
        $scope.borderStyles = getBorderStyles();
        $scope.overflows = getOverflows();
        $scope.whiteSpaces = getWhiteSpaces();
        $scope.textDecorations = getTextDecorations();
        $scope.textAligns = getTextAligns();



        $scope.setChoiceIndex = function (index, item, p, property) {

            p[property] = item.value;

        }


        function buildPropertiesObject(keys, top, skip) {

            var propertiesList = [];
            angular.forEach(keys, function (k, keyk) {
                var properties = new Object();
                properties.index = keyk
                properties.columnName = k
                properties.displayName = k;

                // Heading propeties
                properties.fontFamilyH = "arial";
                properties.fontSizeH = "18";
                properties.fontWeightH = "normal";
                properties.fontStyleH = "italic";
                properties.colorH = "green";
                properties.bgColorH = "brown";
                properties.widthH = "100%";
                properties.heightH = "40";

                properties.overflowH = "visible";
                properties.whiteSpaceH = "normal";
                properties.textDecorationH = "none";
                properties.textAlignH = "left";

                // Borders
                properties.borderBottomColorH = "green";
                properties.borderTopColorH = "green";
                properties.borderLeftColorH = "green";
                properties.borderRightColorH = "green";
                properties.borderBottomStyleH = "solid";
                properties.borderTopStyleH = "solid";
                properties.borderLeftStyleH = "solid";
                properties.borderRightStyleH = "solid";
                properties.borderBottomWidthH = "2";
                properties.borderTopWidthH = "2";
                properties.borderLeftWidthH = "2";
                properties.borderRightWidthH = "2";
                properties.borderBottomLeftRadiusH = "10";
                properties.borderTopLeftRadiusH = "10";
                properties.borderLeftLeftRadiusH = "10";
                properties.borderRightLeftRadiusH = "10";
                properties.borderBottomRightRadiusH = "10";
                properties.borderTopRightRadiusH = "10";
                properties.borderLeftRightRadiusH = "10";
                properties.borderRightRightRadiusH = "10";

                // Heading - End



                // Details propeties
                properties.fontFamily = "arial";
                properties.fontSize = "12";
                properties.fontWeight = "normal";
                properties.fontStyle = "italic";

                properties.color = "red";
                properties.bgColor = "yellow";
                properties.width = "100%";
                properties.height = "20";

                properties.overflow = "visible";
                properties.whiteSpace = "normal";
                properties.textDecoration = "none";
                properties.textAlign = "left";

                // Borders
                properties.borderBottomColor = "green";
                properties.borderTopColor = "green";
                properties.borderLeftColor = "green";
                properties.borderRightColor = "green";
                properties.borderBottomStyle = "solid";
                properties.borderTopStyle = "solid";
                properties.borderLeftStyle = "solid";
                properties.borderRightStyle = "solid";
                properties.borderBottomWidth = "2";
                properties.borderTopWidth = "2";
                properties.borderLeftWidth = "2";
                properties.borderRightWidth = "2";
                properties.borderBottomLeftRadius = "10";
                properties.borderTopLeftRadius = "10";
                properties.borderLeftLeftRadius = "10";
                properties.borderRightLeftRadius = "10";
                properties.borderBottomRightRadius = "10";
                properties.borderTopRightRadius = "10";
                properties.borderLeftRightRadius = "10";
                properties.borderRightRightRadius = "10";


                if (k != "$id") {
                    propertiesList.push(properties);
                }


            });

            var buildPropertiesObject = new Object();
            buildPropertiesObject.topBy = top;
            buildPropertiesObject.skipBy = skip;
            buildPropertiesObject.propertiesList = propertiesList;

            return buildPropertiesObject;
        }


        var propertiesClientTableObjectName = "propertiesClient_" + modalScope.searchTableName + "Object";

        $scope.setLocalStoragePropertiesObject = function (tableName, propertiesObject) {
            window.localStorage.setItem(tableName, angular.toJson(propertiesObject));
        }
        $scope.getLocalStoragePropertiesObject = function (tableName) {
            return angular.fromJson(localStorage.getItem(tableName));
        }


        $scope.keys = modalScope.keys;
        $scope.keysFull = modalScope.keysFull;
        $scope.o = modalScope.o;
        $scope.clientPropertiesObject = modalScope.clientPropertiesObject;

        //window.localStorage.setItem(propertiesClientTableObjectName, null);
        //$scope.clientPropertiesObject = $scope.getLocalStoragePropertiesObject(propertiesClientTableObjectName);

        if ($scope.clientPropertiesObject == null) {
            $scope.setLocalStoragePropertiesObject(propertiesClientTableObjectName, buildPropertiesObject($scope.keys, 10, 0));
            $scope.clientPropertiesObject = $scope.getLocalStoragePropertiesObject(propertiesClientTableObjectName);

        }



        $scope.ok = function () {

            var res = new Object();
            res.modalScope = $scope;
            console.dir(res)
            window.localStorage.setItem(propertiesClientTableObjectName, null);
            $scope.setLocalStoragePropertiesObject(propertiesClientTableObjectName, $scope.clientPropertiesObject);



            $modalInstance.close(res);
        };

        $scope.cancel = function () {


            $modalInstance.dismiss('cancel');
        };





        activate();

        function activate() {

            //alert("heyadGridModalInstanceCtrl")
        }
    }

})();