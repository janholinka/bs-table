'use strict';

/* controllers module */

angular.module("BsTableDirective.Controllers", [])
    .controller("ExampleCtrl", ["$scope", function ($scope) {
        // scope models
        $scope.contactList = [];
        // get data for bs-table
        $scope.contactList = GenerateData(20);
        // show function for bs-table
        $scope.Show = function (contact) {
            alert(JSON.stringify(contact));
        };
        // edit function for bs-table
        $scope.Edit = function (contact) {
            alert(JSON.stringify(contact));
        };
        // remove function for bs-table
        $scope.Remove = function (contact) {
            alert(JSON.stringify(contact));
        };
        // generate data
        function GenerateData(count) {
            var dataList = [];
            for (var i = 0; i < count; i++)
            {
                // create object
                var item = {
                    FirstName: "FirstName " + i,
                    LastName: "LastName " + i,
                    BornDate: "2014-07-10"
                };
                // add to list
                dataList.push(item);
            }
            return dataList;
        }
    }]);