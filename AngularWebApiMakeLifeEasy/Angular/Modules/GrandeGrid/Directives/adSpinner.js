(function () {
    'use strict';

    angular
        .module('appWebApi')
        .directive('adSpinner', adSpinner);

    adSpinner.$inject = [];

    function adSpinner() {


        var directive = {
            link: link,
            restrict: 'E',
            templateUrl: 'Angular/Modules/GrandeGrid/Directives/html/spinnerD.html?x=1',
            //template:'<button>Click This</button>',
            scope: {
                init: "=",
                value: "=",
                inc: "=",
                imgsrc: "@",
                rollover: "="
            },
        };
        return directive;

        function link(scope, elem, attrs) {


            if (scope.value == undefined) {
                if (scope.init == undefined) {
                    scope.value = 10;
                }
                else {
                    scope.value = scope.init;
                }

            }

            if (scope.imgsrc == undefined) {
                scope.imgsrcW = 0;
                scope.imgsrcH = 0;
            }
            else {
                scope.imgsrcW = 20;
                scope.imgsrcH = 20;

            }


            scope.Inc = function (v) {

                //scope.value += parseInt(v);
                // Without this hack concats as string and no calc done!!!
                scope.value -= (v * -1);
                if (scope.inc < 1) {
                    scope.value = scope.value.toFixed(2);
                }
                scope.value = (scope.rollover == null) ? scope.value : scope.value % scope.rollover;

            };
            scope.onKeyup = function (evt, val) {
                if (evt.keyCode === 40) {
                    scope[val] -= scope.inc;
                    if (scope.inc < 1) {
                        scope.value = scope.value.toFixed(2);
                    }


                    scope.value = (scope.rollover == null) ? scope.value : scope.value % scope.rollover;

                    console.log("in scope.onKeyup scope.value: " + scope.value);
                    console.log("in scope.onKeyup scope.rollover: " + scope.rollover);


                } else if (evt.keyCode === 38) {
                    scope[val] -= (scope.inc * -1);
                    if (scope.inc < 1) {
                        scope.value = scope.value.toFixed(2);
                    }
                    //if (scope.value > scope.rollover) {
                    //    scope.value = (scope.value - scope.rollover;
                    //}
                    scope.value = (scope.rollover == null) ? scope.value : scope.value % scope.rollover;

                    console.log("in scope.onKeyup scope.value: " + scope.value);
                    console.log("in scope.onKeyup scope.rollover: " + scope.rollover);

                }
            };




            //scope.ChangeScale = function (val) {
            //    console.log("in ChangeScale val: " + val);
            //    scope.ChangeScaleCtrl(val);
            //};

            ////elem.bind("keydown", function (e) {
            ////    //scope.adVal += parseFloat(e.data);
            ////    ////scope.adVal = parseFloat(scope.adVal);
            ////    ////scope.adVal += parseFloat(e.target.value);
            ////    ////console.log("in keyup currentId: " + scope.currentId);
            ////    ////scope.IncLeft(scope.currentId, attrs.adProp, parseFloat(e.target.value));
            ////    //scope.value += 10;
            ////    //scope.Inc(10)
            ////    //console.log("in keydown e.target.value: " + e.target.value);
            ////    //console.log("in keydown scope.value: " + scope.value);

            ////})



        }
    }

})();