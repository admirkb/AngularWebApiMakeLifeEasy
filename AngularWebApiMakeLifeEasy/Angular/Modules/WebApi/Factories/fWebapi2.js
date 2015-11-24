(function () {
    'use strict';

    angular
        .module('appWebApi')
        .factory('fWebapi2', fWebapi2);

    fWebapi2.$inject = ['$resource'];

    function fWebapi2($resource) {
        var service = {

            manageAll: manageAll,
            writeIndexedDB: writeIndexedDB,
            removeIndexedDB: removeIndexedDB,
            updateIndexedDB: updateIndexedDB,

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
        function writeIndexedDB(data, tableName, tableKey) {
            if (!window.indexedDB) {
                window.alert("Your browser doesn't support a stable version of IndexedDB. Such and such feature will not be available.");
            }

            else {

                try {

                    // Here we go
                    var request = window.indexedDB.open("Admir.AdGrid", 1);
                    request.onerror = function (event) {
                        console.log("onerror...");
                        console.dir(event);
                    };
                    request.onblocked = function (event) {
                        console.log("onblocked ...");
                        console.dir(event);
                    };
                    request.onupgradeneeded = function (e) {
                    }
                    request.onsuccess = function (event) {
                        console.log("onsuccess...");
                        console.dir(event);

                        var db = event.target.result;

                        var tx1 = db.transaction(tableName, "readwrite");
                        var store1 = tx1.objectStore(tableName);
                        //store2.put({ productCode: "ABC1234", productGroup: "1" });


                        angular.forEach(data, function (d, keyD) {

                            try {
                                store1.put(d);
                            }
                            catch (ex) {

                            }


                        });


                        tx1.oncomplete = function () {

                            var tx = db.transaction(tableName, "readonly");
                            var store = tx.objectStore(tableName);
                            //var index = store.index("by_ProductGroup");
                            //var getProducts = store.get("productFiles");
                            store.openCursor().onsuccess = function (event) {
                                var cursor = event.target.result;
                                if (cursor) {
                                    console.log("KEY " + cursor.key);
                                    cursor.continue();
                                }
                                else {
                                    db.close();
                                }
                            };




                        };







                    };

                }
                catch (ex) {
                    alert("Error in writeIndexedDB: " + ex)
                }










            }
        }
        function removeIndexedDB(data, tableName, tableKey) {
            if (!window.indexedDB) {
                window.alert("Your browser doesn't support a stable version of IndexedDB. Such and such feature will not be available.");
            }

            else {

                try {

                    // Here we go
                    var request = window.indexedDB.open("Admir.Cashtill", 1);
                    request.onerror = function (event) {
                        console.log("onerror...");
                        console.dir(event);
                    };
                    request.onblocked = function (event) {
                        console.log("onblocked ...");
                        console.dir(event);
                    };
                    request.onupgradeneeded = function (e) {
                    }
                    request.onsuccess = function (event) {
                        console.log("onsuccess...removeIndexedDB...");
                        console.dir(event);

                        var db = event.target.result;

                        var tx1 = db.transaction(tableName, "readwrite");
                        var store1 = tx1.objectStore(tableName);

                        angular.forEach(data, function (d, keyD) {
                            var req = store1.delete(d.transactionId);
                            ////req.onsuccess = function (ev) {
                            ////    console.log("ondelete..." + req.key);

                            ////}

                        });











                    };

                }
                catch (ex) {
                    alert("Error in writeIndexedDB: " + ex)
                }










            }
        }
        function updateIndexedDB(data, tableName, tableKey) {
            if (!window.indexedDB) {
                window.alert("Your browser doesn't support a stable version of IndexedDB. Such and such feature will not be available.");
            }

            else {

                try {

                    // Here we go
                    var request = window.indexedDB.open("Admir.Cashtill", 1);
                    request.onerror = function (event) {
                        console.log("onerror...");
                        console.dir(event);
                    };
                    request.onblocked = function (event) {
                        console.log("onblocked ...");
                        console.dir(event);
                    };
                    request.onupgradeneeded = function (e) {
                    }
                    request.onsuccess = function (event) {
                        console.log("onsuccess...removeIndexedDB...");
                        console.dir(event);

                        var db = event.target.result;

                        var tx1 = db.transaction(tableName, "readwrite");
                        var store1 = tx1.objectStore(tableName);

                        angular.forEach(data, function (d, keyD) {
                            //var req = store1.delete(d.transactionId);
                            store1.delete(d.transactionId);
                            store1.put(d);


                            ////req.onsuccess = function (ev) {
                            ////    console.log("ondelete..." + req.key);

                            ////}

                        });











                    };

                }
                catch (ex) {
                    alert("Error in writeIndexedDB: " + ex)
                }










            }
        }

        

    }
})();