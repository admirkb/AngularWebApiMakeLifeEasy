(function () {
    'use strict';

    angular
        .module('appWebApi')
        .directive('adColorPicker', adColorPicker);

    adColorPicker.$inject = [];

    function adColorPicker() {


        var directive = {
            link: link,
            restrict: 'A',
            scope: {
                color: "="
            },
        };
        return directive;

        function link(scope, element, attrs) {


            element.spectrum({
                showInput: true,
                showAlpha: true,
                color: scope.color,
                showPalette: true,
                change: function (color) {
                    scope.$apply(function () {
                        //scope.color = color.toHexString();
                        scope.color = color.toString();

                    });
                }
            });


            //scope.$watch('color', function (newColor) {
            //    element.spectrum('set', newColor);
            //});


        }
    }

})();