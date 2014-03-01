"use strict";

/* services module */

var bootsWatchApi = "http://api.bootswatch.com/3/";

angular.module("BsTableDirective.Services", [])
    .factory("BootswatchService", ["$http", function ($http) {
        return {
            GetAll: function () {
                return $http.get(bootsWatchApi);
            }
        }
    }]);