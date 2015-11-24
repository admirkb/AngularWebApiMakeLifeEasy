(function() {
    'use strict';

    angular
        .module('appGrandeGrid')
        .directive('adGrandeGrid', adGrandeGrid)
        .controller('adGrandeGridModalInstanceCtrl', adGrandeGridModalInstanceCtrl)
        .controller('adGrandeGridClientModalInstanceCtrl', adGrandeGridClientModalInstanceCtrl)
        .controller('adGrandeGridUpdateRecordModalInstanceCtrl', adGrandeGridUpdateRecordModalInstanceCtrl)
        .controller('adGrandeGridNewRecordModalInstanceCtrl', adGrandeGridNewRecordModalInstanceCtrl)
        .controller('cDeleteConfModalInstanceCtrl', cDeleteConfModalInstanceCtrl);

    adGrandeGrid.$inject = ['$compile', '$filter', 'fWebapi2', '$modal', 'foDataApi1', '$http', 'fCommon'];
    
    function buildClientPropertiesObject(keys, top, skip) {

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
    function buildServerPropertiesObject(keys, top, skip) {

        var propertiesList = [];
        angular.forEach(keys, function (k, keyk) {
            var properties = new Object();
            properties.index = keyk
            properties.columnName = k.name
            properties.selectedSelectValue = true
            properties.selectedOrderByValue = false
            properties.selectedFilterByValue = false

            if (k.name != "$id") {
                propertiesList.push(properties);
            }


        });

        var buildPropertiesObject = new Object();
        buildPropertiesObject.topBy = top;
        buildPropertiesObject.skipBy = skip;
        buildPropertiesObject.propertiesList = propertiesList;

        return buildPropertiesObject;
    }
    function getODataMetadata(http, scope, table) {

        var odataMetadata = "/odata/$metadata#oData" + table;
        var getString = odataMetadata;

        // $http handles returned xml better than ngResource. Thats why|
        http.get(getString).success(function (data, status, headers, config) {

            var xmlDoc = $.parseXML(data);
            var $xml = $(xmlDoc);
            var entityType = $xml.find('EntityType[Name="' + table.slice(0,-1) + '"]');

            $xml = $(entityType);

            //$xml = $(entityType);
            var property = $xml.find("Property");
            var propertyRef = $xml.find("PropertyRef");

            var propertyList = [];
            angular.forEach(property, function (p, keyp) {

                var name, type, nullable;

                name = $(p).attr('Name');
                type = $(p).attr('Type');
                nullable = $(p).attr('Nullable');

                var newPropertyObject = new Object();
                newPropertyObject.name = name;
                newPropertyObject.type = type;
                newPropertyObject.nullable = nullable;

                propertyList.push(newPropertyObject);
            });

            var name = $(propertyRef).attr('Name');

            var metaData = new Object();
            metaData.key = name;
            metaData.propertyList = propertyList;

            var eo = new Object();
            eo.time = new Date();
            eo.metaData = metaData;

            scope.$emit("adGrandeGrid.odataMetadata", eo);



        }).error(function (data, status, headers, config) {

            var d = data;

        });

    }

    function adGrandeGrid($compile, $filter, fWebapi2, $modal, foDataApi1, $http, fCommon) {


        var directive = {
            compile: compile,
            templateUrl: 'Angular/Modules/GrandeGrid/Directives/html/adGrandeGridHeader.html',
            restrict: 'E',
            scope: { targetTable: "@", designTimeControls: "=" },
 
        };
        return directive;
        var template = '<div></div>';

        function startUp(scope) {

            //scope.designTimeControls = (scope.designTimeControls === 'true') ? true : false;
            scope.searchTableNamePrev = scope.targetTable;
            scope.searchTableName = scope.targetTable;
            scope.serverOrderBy = "ContactName"
            scope.serverFilterBy = "substringof('in' , ContactName )";
            scope.serverSelectBy = "ContactName, Country";
            scope.serverTopBy = "0";
            scope.serverSkipBy = "0";

            scope.serverOrderBy = ""
            scope.serverFilterBy = "";
            scope.serverSelectBy = "";

            newTable(scope, scope.searchTableName)

        }

        function newTable(scope, table) {

            scope.searchTableName = table;
            ////scope.serverOrderBy = "ContactName"
            ////scope.serverFilter = "substringof('in' , ContactName )";
            ////scope.serverSelectBy = "ContactName, Country";
            ////scope.serverTopBy = "100";
            ////scope.serverSkipBy = "0";

            ////scope.serverOrderBy = ""
            ////scope.serverFilter = "";
            ////scope.serverSelectBy = "";

            // Get metadata here once only and filter on change of table.

            getODataMetadata($http, scope, scope.searchTableName)


        }


        function compile(element, attributes) {

            function serverPaging(scope) {

                scope.serverTotalItems = 0;
                scope.serverCurrentPage = 1;
                scope.serverMaxSize = 15;
                scope.serverTags = "";
                scope.serverItemsPerPage = 8;

                scope.serverSetPage = function (pageNo) {
                    scope.serverCurrentPage = pageNo;
                };
                scope.serverNext = function () {

                    //activate();
                };

                scope.serverPageChanged = function () {


                    var limit = scope.serverItemsPerPage;
                    var begin = scope.serverItemsPerPage * (scope.serverCurrentPage - 1);

                    scope.serverTopBy = limit;
                    scope.serverSkipBy = begin;

                    activate(scope);
                    //scope.data = $filter('limitTo')(scope.dataFull, limit, begin);
                    //activate();

                    console.log('Page changed to: ' + scope.currentPage + " - limit: " + limit + " - begin: " + begin);


                };

                //scope.$watch('itemsPerPage', function () {

                //    scope.maxSize = (scope.totalItems / scope.itemsPerPage) + 1;

                //    var limit = scope.itemsPerPage;
                //    var begin = scope.itemsPerPage * (scope.currentPage - 1);
                //    scope.data = $filter('limitTo')(scope.dataFull, limit, begin);
                //});

            }
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


            var propertiesTableObjectName = "properties_" + scope.searchTableName + "Object";
            var serverSelectByString = "";
            var serverOrderByString = "";
            var serverFilterByString = "";

            //window.localStorage.setItem(propertiesTableObjectName, null);

            /* S E R V E R --  S E R V E R --  S E R V E R --  S E R V E R -- */
            scope.propertiesObject = scope.getLocalStoragePropertiesObject(propertiesTableObjectName);
            if (scope.propertiesObject == null) {
                scope.setLocalStoragePropertiesObject(propertiesTableObjectName, buildServerPropertiesObject(scope.keys, 10, 0));
                scope.propertiesObject = scope.getLocalStoragePropertiesObject(propertiesTableObjectName);

            }

            if (scope.propertiesObject != null) {
                angular.forEach(scope.propertiesObject.propertiesList, function (p, keyp) {

                    var upperCaseFirstLetterSelectBy = p.columnName[0].toUpperCase() + p.columnName.slice(1);

                    if (p.selectedSelectValue == true) {
                        serverSelectByString = serverSelectByString + upperCaseFirstLetterSelectBy + ","
                    }

                    if (p.selectedOrderByValue == true) {
                        serverOrderByString = serverOrderByString + upperCaseFirstLetterSelectBy + ","
                    }

                    if (p.selectedFilterByValue == true) {
                        // works... serverFilterByString = serverFilterByString + upperCaseFirstLetterSelectBy + " eq " + "'" + p.selectedFilterByValueString + "'" + " ,"
                        serverFilterByString = serverFilterByString + "substringof('" + p.selectedFilterByValueString + "' , " + upperCaseFirstLetterSelectBy + " )" + ","
                    }
                });

                scope.serverSelectBy = serverSelectByString;
                serverOrderByString = serverOrderByString.replace(/,\s*$/, "");
                scope.serverOrderBy = serverOrderByString;

                serverFilterByString = serverFilterByString.replace(/,\s*$/, "");
                scope.serverFilterBy = serverFilterByString;
                console.dir(scope.serverOrderBy);

            }
            /* S E R V E R -- S E R V E R -- S E R V E R -- S E R V E R -- */



            /* C L I E N T -- C L I E N T -- C L I E N T -- C L I E N T -- */

            //////// Client start up properties

            var propertiesClientTableObjectName = "propertiesClient_" + scope.searchTableName + "Object";
            scope.clientOrderBy = ""
            var clientOrderByString = "";

            //window.localStorage.setItem(propertiesClientTableObjectName, null);
            scope.clientPropertiesObject = scope.getLocalStoragePropertiesObject(propertiesClientTableObjectName);

            if (scope.clientPropertiesObject == null) {
                scope.setLocalStoragePropertiesObject(propertiesClientTableObjectName, buildClientPropertiesObject(scope.keys, 10, 0));
                scope.clientPropertiesObject = scope.getLocalStoragePropertiesObject(propertiesClientTableObjectName);

            }

            //////if ($scope.clientPropertiesObject != null) {

            //////    clientOrderByString = clientOrderByString.replace(/,\s*$/, "");
            //////    $scope.clientOrderBy = clientOrderByString;
            //////    console.dir($scope.clientOrderBy);

            //////}


            /* C L I E N T -- C L I E N T -- C L I E N T -- C L I E N T -- */





            var t = new Object();
            t.tableName = scope.searchTableName;
            t.orderBy = scope.serverOrderBy;
            t.filterBy = scope.serverFilterBy;
            t.topBy = scope.serverTopBy;
            t.skipBy = scope.serverSkipBy;
            t.selectBy = scope.serverSelectBy;

            var oDataParams = new Object();
            oDataParams.$orderby = (t.orderBy != "") ? (t.orderBy == '$id') ? null : t.orderBy : null;
            oDataParams.$filter = (t.filterBy != "") ? t.filterBy : null;
            oDataParams.$top = (t.topBy != "") ? t.topBy : null;
            oDataParams.$skip = (t.skipBy != "") ? t.skipBy : null;
            oDataParams.$select = (t.selectBy != "") ? t.selectBy : null;
            oDataParams.$inlinecount = "allpages";

            //console.log(oDataParams)

            try{
                foDataApi1.manageAll(t.tableName).query(oDataParams).$promise.then(function (data) {
                    console.log('Success - query manageAll')
                    console.dir(data)
                    console.log('Success - query manageAll')

                    var eo = new Object();
                    eo.time = new Date();
                    eo.data = data;
                    eo.tableName = t.tableName;
                    console.log('emit foDataApi1.manageAll.query')
                    scope.$emit("foDataApi1.manageAll.query", eo);


                }, function (err) {
                    alert("Cannot find table name: " + scope.searchTableName + " ~ Error: " + err.statusText)
                    console.log('Error- query manageAll: ' + err.status + ' - ' + err.statusText)
                });
            }
            catch (err) {
                alert("Catch::Cannot find table name: " + scope.searchTableName + " ~ Error: " + err.statusText)

            }
            finally {
                //alert("Finally::")

            }






        }


        function theStuff(scope, elem, attrs, controller, transcludeFn) {

            scope.keysFull = null;


            scope.$on('adGrandeGrid.odataMetadata', function (e, eo) {

                scope.metaData = eo.metaData;

                console.log("scope.metaData");
                console.dir(scope.metaData);
                console.log("scope.metaData");

                scope.keys = scope.metaData.propertyList;


                var limit = scope.serverItemsPerPage;
                var begin = scope.serverItemsPerPage * (scope.serverCurrentPage - 1);

                scope.serverTopBy = limit;
                scope.serverSkipBy = begin;

                activate(scope);






            });

            scope.$on('foDataApi1.manageAll.query', function (e, eo) {

                var odataMetadata = eo.data['odata.metadata'];
                var odataCount = eo.data['odata.count'];

                scope.dataFull = eo.data.value;
                scope.data = eo.data.value;
                scope.serverTotalItems = odataCount;
                scope.serverMaxSize = (scope.serverTotalItems / scope.serverItemsPerPage) + 1;

                var limit = scope.serverItemsPerPage;
                var begin = scope.serverItemsPerPage * (scope.serverCurrentPage - 1);

                scope.serverTopBy = limit;
                scope.serverSkipBy = begin;




                scope.keys = scope.metaData.propertyList;
                scope.keysFull = scope.keys// for updates we need all fields
                //scope.keys = Object.keys(eo.data.value[0]);
                // Set up object for each column to hold some properties for it
                scope.o = new Object();

                if (scope.propertiesObject == null) { return; }


                // Decorate the headings with column name
                var propertiesList = scope.propertiesObject.propertiesList;

                scope.keysFiltered = [];
                angular.forEach(scope.keys, function (k, keyk) {
                    var found = $filter('filter')(propertiesList, { columnName: k.name }, 'strict');
                    if (found.length != 0 && found[0].selectedSelectValue) {

                        scope.keysFiltered.push(k);
                    }

                });

                scope.keys = scope.keysFiltered;


                //////angular.forEach(scope.keys, function (k, keyk) {

                //////    var searchObj = new Object();
                //////    searchObj[k.name] = "";
                //////    //scope.data = $filter('filter')(scope.data, { companyName: 'Admir' , contactName: 'Kelvin' }, 'strict');
                //////    var found = $filter('filter')(propertiesList, { columnName: k.name }, 'strict');

                //////    if (found.length != 0) {

                //////        ////if (k.selectedSelectValue) {
                //////        ////    scope.o[k.name] = new Object();

                //////        ////    scope.o[k.name]['displayName'] = (found[0]['displayName'] != null) ? found[0]['displayName'] : k.name;

                //////        ////}
                //////    }




                //////});



                if (scope.clientPropertiesObject == null) { return; }

                // Decorate the details with lots of properties
                propertiesList = scope.clientPropertiesObject.propertiesList;
                angular.forEach(scope.keys, function (k, keyk) {

                    var searchObj = new Object();
                    //searchObj[columnName][name] = "SupplierId";
                    //scope.data = $filter('filter')(scope.data, { companyName: 'Admir' , contactName: 'Kelvin' }, 'strict');
                    var found = $filter('filter')(propertiesList, k.name, 'strict');


                    if (found.length != 0) {

                        scope.o[k.name] = new Object();

                        scope.o[k.name]['displayName'] = (found[0]['displayName'] != null) ? found[0]['displayName'] : k.name;


                        /* Headers - Start */

                        scope.o[k.name]['fontFamilyH'] = found[0]['fontFamilyH']
                        scope.o[k.name]['fontSizeH'] = found[0]['fontSizeH']
                        scope.o[k.name]['fontWeightH'] = found[0]['fontWeightH']
                        scope.o[k.name]['fontStyleH'] = found[0]['fontStyleH']
                        scope.o[k.name]['colorH'] = found[0]['colorH']
                        scope.o[k.name]['bgColorH'] = found[0]['bgColorH']
                        scope.o[k.name]['widthH'] = (found[0]['widthH'] != null) ? found[0]['widthH'] : "100%";
                        scope.o[k.name]['heightH'] = (found[0]['heightH'] != null) ? found[0]['heightH'] : "20px";

                        scope.o[k.name]['overflowH'] = found[0]['overflowH']
                        scope.o[k.name]['whiteSpaceH'] = found[0]['whiteSpaceH']
                        scope.o[k.name]['textDecorationH'] = found[0]['textDecorationH']
                        scope.o[k.name]['textAlignH'] = found[0]['textAlignH']

                        // Borders
                        scope.o[k.name]['borderBottomColorH'] = found[0]['borderBottomColorH']
                        scope.o[k.name]['borderTopColorH'] = found[0]['borderTopColorH']
                        scope.o[k.name]['borderLeftColorH'] = found[0]['borderLeftColorH']
                        scope.o[k.name]['borderRightColorH'] = found[0]['borderRightColorH']
                        scope.o[k.name]['borderBottomStyleH'] = found[0]['borderBottomStyleH']
                        scope.o[k.name]['borderTopStyleH'] = found[0]['borderTopStyleH']
                        scope.o[k.name]['borderLeftStyleH'] = found[0]['borderLeftStyleH']
                        scope.o[k.name]['borderRightStyleH'] = found[0]['borderRightStyleH']
                        scope.o[k.name]['borderBottomWidthH'] = found[0]['borderBottomWidthH']
                        scope.o[k.name]['borderTopWidthH'] = found[0]['borderTopWidthH']
                        scope.o[k.name]['borderLeftWidthH'] = found[0]['borderLeftWidthH']
                        scope.o[k.name]['borderRightWidthH'] = found[0]['borderRightWidthH']
                        scope.o[k.name]['borderBottomLeftRadiusH'] = found[0]['borderBottomLeftRadiusH']
                        scope.o[k.name]['borderTopLeftRadiusH'] = found[0]['borderTopLeftRadiusH']
                        scope.o[k.name]['borderLeftLeftRadiusH'] = found[0]['borderLeftLeftRadiusH']
                        scope.o[k.name]['borderRightLeftRadiusH'] = found[0]['borderRightLeftRadiusH']
                        scope.o[k.name]['borderBottomRightRadiusH'] = found[0]['borderBottomRightRadiusH']
                        scope.o[k.name]['borderTopRightRadiusH'] = found[0]['borderTopRightRadiusH']
                        scope.o[k.name]['borderLeftRightRadiusH'] = found[0]['borderLeftRightRadiusH']
                        scope.o[k.name]['borderRightRightRadiusH'] = found[0]['borderRightRightRadiusH']


                        /* Headers - End */


                        scope.o[k.name]['fontFamily'] = found[0]['fontFamily']
                        scope.o[k.name]['fontSize'] = found[0]['fontSize']
                        scope.o[k.name]['fontWeight'] = found[0]['fontWeight']
                        scope.o[k.name]['fontStyle'] = found[0]['fontStyle']
                        scope.o[k.name]['color'] = found[0]['color']
                        scope.o[k.name]['bgColor'] = found[0]['bgColor']
                        scope.o[k.name]['width'] = (found[0]['width'] != null) ? found[0]['width'] : "100%";
                        scope.o[k.name]['height'] = (found[0]['height'] != null) ? found[0]['height'] : "10px";


                        scope.o[k.name]['overflow'] = found[0]['overflow']
                        scope.o[k.name]['whiteSpace'] = found[0]['whiteSpace']
                        scope.o[k.name]['textDecoration'] = found[0]['textDecoration']
                        scope.o[k.name]['textAlign'] = found[0]['textAlign']



                        // Borders
                        scope.o[k.name]['borderBottomColor'] = found[0]['borderBottomColor']
                        scope.o[k.name]['borderTopColor'] = found[0]['borderTopColor']
                        scope.o[k.name]['borderLeftColor'] = found[0]['borderLeftColor']
                        scope.o[k.name]['borderRightColor'] = found[0]['borderRightColor']
                        scope.o[k.name]['borderBottomStyle'] = found[0]['borderBottomStyle']
                        scope.o[k.name]['borderTopStyle'] = found[0]['borderTopStyle']
                        scope.o[k.name]['borderLeftStyle'] = found[0]['borderLeftStyle']
                        scope.o[k.name]['borderRightStyle'] = found[0]['borderRightStyle']
                        scope.o[k.name]['borderBottomWidth'] = found[0]['borderBottomWidth']
                        scope.o[k.name]['borderTopWidth'] = found[0]['borderTopWidth']
                        scope.o[k.name]['borderLeftWidth'] = found[0]['borderLeftWidth']
                        scope.o[k.name]['borderRightWidth'] = found[0]['borderRightWidth']
                        scope.o[k.name]['borderBottomLeftRadius'] = found[0]['borderBottomLeftRadius']
                        scope.o[k.name]['borderTopLeftRadius'] = found[0]['borderTopLeftRadius']
                        scope.o[k.name]['borderLeftLeftRadius'] = found[0]['borderLeftLeftRadius']
                        scope.o[k.name]['borderRightLeftRadius'] = found[0]['borderRightLeftRadius']
                        scope.o[k.name]['borderBottomRightRadius'] = found[0]['borderBottomRightRadius']
                        scope.o[k.name]['borderTopRightRadius'] = found[0]['borderTopRightRadius']
                        scope.o[k.name]['borderLeftRightRadius'] = found[0]['borderLeftRightRadius']
                        scope.o[k.name]['borderRightRightRadius'] = found[0]['borderRightRightRadius']


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
                        var customerId = p.CustomerId;

                        fWebapi2.manageAll("Customers").update({ id: customerId }, customer).$promise.then(function (p) {
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
                    d.Delete = function (p, keyp) {
                        d.isEditable = false;

                        var size = 'sm';
                        var modalInstance = $modal.open({
                            templateUrl: 'Angular/Modules/GrandeGrid/Directives/html/deleteConfModal.html',
                            controller: 'cDeleteConfModalInstanceCtrl',
                            size: size,
                            resolve: {
                                modalScope: function () { return p; },
                            }
                        });

                        modalInstance.result.then(function (res) {

                            console.log('Modal says you want to update: ' + new Date());

                            var customerId = res.modalScope.thedata.CustomerId;

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

                            scope.data.splice(keyp, 1);


                        }, function () {
                            console.log('Modal dismissed at: ' + new Date());
                        });







                    }
                    d.Run = function (p, keyp) {

                        scope.thedata = d;
                        var size = 'lg';
                        var modalInstance = $modal.open({
                            backdrop: 'static',
                            templateUrl: 'Angular/Modules/GrandeGrid/Directives/html/adGrandeGridNewRecordModal.html',
                            controller: 'adGrandeGridUpdateRecordModalInstanceCtrl',
                            size: size,
                            resolve: {
                                modalScope: function () { return scope; },
                            }
                        });

                        modalInstance.result.then(function (res) {

                            console.log('Modal says you want to update: ' + new Date());

                            var customer = res.modalScope.thedata;
                            var customerId = res.modalScope.thedata.CustomerId;

                            fWebapi2.manageAll("Customers").update({ id: customerId }, customer).$promise.then(function (p) {
                                console.log('Success - update customers')
                                console.dir(p)
                                console.log('Success - update customers')

                                var eo = new Object();
                                eo.time = new Date();

                                //scope.$emit("adMediaUpload.DeleteFile", eo);
                            }, function (err) {
                                console.log('Error- update customers: ' + err.status + ' - ' + err.statusText)
                            });

                        });

                    }

                    d.getColor = function (s) {

                        if (s.indexOf("?") != -1) {
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


                $.event.trigger({ type: "StartUpEvent", message: "Start Up Event", time: new Date() });

            }


            return {
                pre: function (scope, elem, attrs, controller, transcludeFn) {

                    scope.setLocalStoragePropertiesObject = function (tableName, propertiesObject) {
                        window.localStorage.setItem(tableName, angular.toJson(propertiesObject));
                    }
                    scope.getLocalStoragePropertiesObject = function (tableName) {
                        return angular.fromJson(localStorage.getItem(tableName));
                    }


                    startUp(scope);
                    serverPaging(scope);


                    scope.changeTable = function (tableName) {
                        //scope.keys = null;


                        if (scope.searchTableNamePrev == tableName) {
                            activate(scope);
                        }
                        else {
                            scope.searchTableNamePrev = tableName;
                            newTable(scope, tableName)
                        }



                        //scope.searchTableName = tableName;
                        //// need new metadata for new table

                        //newTable(scope, scope.searchTableName)

                        //activate(scope);

                    }
                    scope.getServerProperties = function (tableName) {
                        scope.propertiesName = tableName;

                        // Fire up modal here

                        var size = 'lg';
                        var modalInstance = $modal.open({
                            backdrop: 'static',
                            templateUrl: 'Angular/Modules/GrandeGrid/Directives/html/adGrandeGridModal.html',
                            controller: 'adGrandeGridModalInstanceCtrl',
                            size: size,
                            resolve: {
                                modalScope: function () { return scope; },
                            }
                        });

                        ////modalInstance.result.then(function (res) {

                        ////    console.log('Modal says you want to update: ' + new Date());
                        ////    var eo = new Object();
                        ////    eo.time = new Date();

                        ////    var serverSelectByString = "";
                        ////    var serverOrderByString = "";

                        ////    angular.forEach(res.modalScope.propertiesObject.propertiesList, function (p, keyp) {

                        ////        var upperCaseFirstLetterSelectBy = p.columnName[0].toUpperCase() + p.columnName.slice(1);

                        ////        console.log(upperCaseFirstLetterSelectBy);
                        ////        if (p.selectedSelectValue == true) {
                        ////            serverSelectByString = serverSelectByString + upperCaseFirstLetterSelectBy + ","
                        ////        }

                        ////    });


                        ////    scope.serverSelectBy = serverSelectByString;
                        ////    serverOrderByString = serverOrderByString.replace(/,\s*$/, "");
                        ////    scope.serverOrderBy = serverOrderByString;
                        ////    console.dir(scope.serverOrderBy);


                        ////    activate(scope);
                        ////    //scope.$emit("adSmallImageLine.Update", eo);





                        ////});


                    }
                    scope.getClientProperties = function (tableName) {

                        // Fire up modal here

                        var size = 'lg';
                        var modalInstance = $modal.open({
                            backdrop: 'static',
                            templateUrl: 'Angular/Modules/GrandeGrid/Directives/html/adGrandeGridClientModal.html',
                            controller: 'adGrandeGridClientModalInstanceCtrl',
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
                    scope.changeClientOrderBy = function (index) {

                        var orderByColumnName = scope.keys[index].name;
                        var directionToggle = scope.o[orderByColumnName]['orderBy'] = !scope.o[orderByColumnName]['orderBy'];

                        var direction = (directionToggle == true) ? '' : 'reverse';
                        scope.data = $filter('orderBy')(scope.data, orderByColumnName, direction);

                    }
                    scope.Test = function (colName, colValue) {

                        var eo = new Object();
                        eo.time = new Date();

                        var searchObj = new Object();
                        // built up with every run, should contain the complete list of where fields and values
                        searchObj[colName.name] = colValue;

                        //scope.data = $filter('filter')(scope.data, { companyName: 'Admir' , contactName: 'Kelvin' }, 'strict');


                        scope.data = $filter('filter')(scope.dataFull, searchObj, 'strict');

                        scope.totalItems = scope.data.length;
                        scope.maxSize = (scope.totalItems / scope.itemsPerPage) + 1;

                        var limit = scope.itemsPerPage;
                        var begin = scope.itemsPerPage * (scope.currentPage - 1);
                        scope.data = $filter('limitTo')(scope.data, limit, begin);

                    }
                    scope.AddNewRecord = function (p, key) {


                        if (p == null) {

                            scope.thedata = p;
                            var size = 'lg';
                            var modalInstance = $modal.open({
                                backdrop: 'static',
                                templateUrl: 'Angular/Modules/GrandeGrid/Directives/html/adGrandeGridNewRecordModal.html',
                                controller: 'adGrandeGridNewRecordModalInstanceCtrl',
                                size: size,
                                resolve: {
                                    modalScope: function () { return scope; },
                                }
                            });

                            modalInstance.result.then(function (res) {

                                console.log('Modal says you want to update: ' + new Date());

                                var guid = fCommon.getGuid();

                                console.dir(Object.keys(res.modalScope.thedata));
                                var columns = Object.keys(res.modalScope.thedata);
                                var newRecordString = "";
                                angular.forEach(columns, function (k, keyk) {

                                    newRecordString = newRecordString + '"' + k + '": "' + res.modalScope.thedata[k] + '" ,';
                                });

                                newRecordString = newRecordString.replace(/,\s*$/, "");

    //                            var sss = '{' +
    //newRecordString +

    //'}';
                                // Need to add the comma's and remove the last comma
                                //var xxx = angular.fromJson(sss);

                    
                          
          
                                var newRecordTemp = '{' + 
                                    '"CustomerId":"' + guid + '"' + " , " +
                                    newRecordString +

                                    '}';
                                var newRecord = angular.fromJson(newRecordTemp);
                               
      


                                //var newRecord = {
                                //    CustomerId: guid,
                                //    CompanyName: res.modalScope.thedata.CompanyName,
                                //    ContactName: res.modalScope.thedata.ContactName,
                                //    ContactTitle: "Mr",
                                //    Address: "160",
                                //    City: "Cardiff",
                                //    Region: "90",
                                //    PostalCode: "PostalCode",
                                //    Country: "Country",

                                //};


                                fWebapi2.manageAll("Customers").save(newRecord).$promise.then(function (p) {
                                    console.log('Success - save customers')
                                    console.dir(p)
                                    console.log('Success - save customers')

                                    var eo = new Object();
                                    eo.time = new Date();

                                    scope.data.push(p);
                               

                                    //scope.$emit("adMediaUpload.DeleteFile", eo);
                                }, function (err) {
                                    console.log('Error- save customers: ' + err.status + ' - ' + err.statusText)
                                });

                            });

                            //if ($scope.CustomerId == null) {
                            //    alert("$scope.CustomerId is null");
                            //    return;
                            //}
                            var o = new Object();

                            var newRecord = {
                                //CustomerId: $scope.CustomerId,
                                //Name: $scope.smallImageName,
                                //Image: null,
                                //Tags: " ",
                                //Width: "160",
                                //Height: "90",
                                //Filepath: 'Images/Admir01-BlackBackground.png',

                            };

                            //fWebapiAnimationsWizard.manageStaffs().save(smallImage).$promise.then(function (p) {

                            //    $scope.staffsList.unshift(p)

                            //}, function (err) {
                            //    console.dir(err)
                            //    //alert('Status: ' + reason.status);
                            //});
                        }
                        else {
                            //fWebapiAnimationsWizard.manageStaffs().update({ customerId: p.customerId, id: p.staffId }, p).$promise.then(function (p) {
                            //    console.dir(p)
                            //    //alert('Success: ' + data);
                            //}, function (err) {
                            //    console.dir(err)
                            //    //alert('Status: ' + reason.status);
                            //});
                        }

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

                        fWebapi2.manageAll("Customers").update({ id: customerId }, customer ).$promise.then(function (p) {
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
    function adGrandeGridModalInstanceCtrl($scope, $modalInstance, modalScope, $filter) {

        var propertiesTableObjectName = "properties_" + modalScope.searchTableName + "Object";

        $scope.keys = modalScope.keys;
        $scope.keysFull = modalScope.keysFull;
        $scope.o = modalScope.o;

        $scope.propertiesObject = modalScope.getLocalStoragePropertiesObject(propertiesTableObjectName);

        //if ($scope.propertiesObject == null) {
        //    $scope.setLocalStoragePropertiesObject(propertiesTableObjectName, buildPropertiesObject($scope.keys, 10, 0));
        //    $scope.propertiesObject = $scope.getLocalStoragePropertiesObject(propertiesTableObjectName);

        //}




        $scope.ok = function () {

            var res = new Object();
            res.modalScope = $scope;
            console.dir(res)
            //window.localStorage.setItem(propertiesTableObjectName, null);
            modalScope.setLocalStoragePropertiesObject(propertiesTableObjectName, $scope.propertiesObject);


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

    function cDeleteConfModalInstanceCtrl($scope, $modalInstance, modalScope) {

        $scope.thedata = modalScope;
        $scope.ok = function () {

            var res = new Object();
            res.modalScope = $scope;
            $modalInstance.close(res);
        };

        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };


    }
    function adGrandeGridClientModalInstanceCtrl($scope, $modalInstance, modalScope, $filter) {

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

        $scope.keys = modalScope.keys;
        $scope.keysFull = modalScope.keysFull;
        $scope.o = modalScope.o;
        $scope.clientPropertiesObject = modalScope.getLocalStoragePropertiesObject(propertiesClientTableObjectName);

        //if ($scope.clientPropertiesObject == null) {
        //    $scope.setLocalStoragePropertiesObject(propertiesClientTableObjectName, buildPropertiesObject($scope.keys, 10, 0));
        //    $scope.clientPropertiesObject = $scope.getLocalStoragePropertiesObject(propertiesClientTableObjectName);

        //}



        $scope.ok = function () {

            var res = new Object();
            res.modalScope = $scope;
            console.dir(res)
            //window.localStorage.setItem(propertiesClientTableObjectName, null);
            modalScope.setLocalStoragePropertiesObject(propertiesClientTableObjectName, $scope.clientPropertiesObject);


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
    function adGrandeGridNewRecordModalInstanceCtrl($scope, $modalInstance, modalScope) {
        

        // Initial items from calling scope. i.e. main controller
        $scope.thedata = [];
        //  need o.displayname.name
        $scope.o = modalScope.o;
        $scope.keys = modalScope.keysFull;

        $scope.ok = function () {

            var res = new Object();
            res.modalScope = $scope;


            console.dir(res)

            $modalInstance.close(res);
        };

        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };

        activate();

        function activate() {

            //alert("heycStaffMaintModalInstanceCtrl")
        }
    }
    function adGrandeGridUpdateRecordModalInstanceCtrl($scope, $modalInstance, modalScope) {


        // Initial items from calling scope. i.e. main controller
        $scope.thedata = modalScope.thedata;
        //  need o.displayname.name
        $scope.o = modalScope.o;
        $scope.keys = modalScope.keysFull;

        $scope.ok = function () {

            var res = new Object();
            res.modalScope = $scope;


            console.dir(res)

            $modalInstance.close(res);
        };

        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };

        activate();

        function activate() {

            //alert("heycStaffMaintModalInstanceCtrl")
        }
    }

})();