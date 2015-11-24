(function () {
    'use strict';

    angular
        .module('appWebApi')
        .factory('fCommon', fCommon);


    function fCommon() {

        Date.prototype.addHours = function (h) {
            this.setTime(this.getTime() + (h * 60 * 60 * 1000));
            return this;
        }

        String.prototype.guid = function guid() {
            function _p8(s) {
                var p = (Math.random().toString(16) + "000000000").substr(2, 8);
                return s ? "-" + p.substr(0, 4) + "-" + p.substr(4, 4) : p;
            }
            return _p8() + _p8(true) + _p8(true) + _p8();
        }

        var service = {
            getDatePlusHours: getDatePlusHours,
            getGuid: getGuid,
            helloWorld: helloWorld,
            getQueryParam: getQueryParam,
            helloWorldAnon: function helloWorld() { alert('Hello WorldNon') }
        };

        return service;

        function helloWorld() { alert('Hello World') }
        function getDatePlusHours(hours) {

            var addedHoursDate = new Date().addHours(hours);

            return addedHoursDate;
        }
        function getGuid() { return new String().guid(); }
        function getQueryParam(param) {
            var result = window.location.search.match(
                new RegExp("(\\?|&)" + param + "(\\[\\])?=([^&]*)")
            );

            return result ? result[3] : false;
        }


    }
})();