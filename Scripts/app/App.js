"use strict";

/* app module */

angular.module("BsTableDirective", ["ngRoute", "bsTable", "BsTableDirective.Controllers", "BsTableDirective.Services"])
    .config(["$routeProvider", function ($routeProvider) {
        $routeProvider.when("/", {
            templateUrl: "Content/templates/example.html",
            controller: "ExampleCtrl"
        })
        .otherwise({ redirectTo: "/" });
    }]);