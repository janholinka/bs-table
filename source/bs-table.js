'use strict';

/*
BsTable - http://bs-table.com
Licensed under the MIT license

Copyright (c) 2014 Jan Holinka

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

angular.module("bsTable", [])
    .directive("bsTable", function () {
        return {
            restrict: "A",
            scope: true,
            compile: function (tElement, tAttrs) {
                // create thead for table
                var header = angular.element("<thead><tr></tr></thead>"),
                    headerRow = header.children("tr"),
                    totalRows = 0,
                    tBodyRow = tElement.children("tbody").children("tr"),
                    ngRepeatAttr = tBodyRow.attr("ng-repeat");

                // set ng-repeat attribute
                tBodyRow.attr("ng-repeat", ngRepeatAttr + " | bsTableSkip:bsTableSortPagination.skipAt | orderBy:bsTableSortPagination.predicate:bsTableSortPagination.reverse | limitTo:bsTableSortPagination.pageSize");

                angular.forEach(tBodyRow.children("td"), function (element) {
                    // get column
                    var column = angular.element(element),
                        columnType = column.attr("data-type");

                    // if column does not contain data
                    if (columnType == "command") {
                        // add empty column to thead
                        headerRow.append("<th></th>");

                        // increment total totalRows
                        totalRows += 1;
                        return;
                    }

                    // get angularjs bind expression from column
                    var expression = column.html(),
                        expressionValue = expression.replace(/[{}\s]/g, ""),
                        name = expressionValue.split(/\.(.+)?/)[1].split(/\|/)[0],
                        filter = expressionValue.split(/\.(.+)?/)[1].split(/\|/)[1],
                        filterAttr = (!filter) ? "" : "filter=\"" + filter + "\"",
                        title = column.attr("data-title");

                    // add column with data to thead
                    headerRow.append("<th name=\"" + name + "\" " + filterAttr + ">" + title + "<span style=\"padding-left: 4px;\"></span></th>");

                    // remove attribute name
                    column.removeAttr("data-title");

                    // increment total totalRows
                    totalRows += 1;
                });

                // add thead to table
                tElement.prepend(header);

                // create tfoot for table
                var footer = "<tfoot><tr><td colspan=\"" + totalRows + "\">" +
                             "<ul class=\"pagination\"></ul>" +
                             "<select ng-model=\"bsTableSortPagination.pageSize\" class=\"form-control select-page-size\">" +
                             "<option value=\"5\" selected=\"selected\">5</option><option value=\"10\">10</option><option value=\"20\">20</option><option value=\"40\">40</option></select>" +
                             "</td></tr></tfoot>";

                // add tfoot to table
                tElement.append(footer);

                return {
                    pre: function (scope, linkElement) {
                        var grid = scope.bsTableSortPagination = {};

                        // create pagination for table
                        var pager = linkElement.children("tfoot").children("tr").children("td"),
                            collectionName = ngRepeatAttr.match(/^\s*(.+)\s+in\s+(.*)\s*$/)[2],
                            collection = scope.$eval(collectionName),
                            totalRows = collection.length;

                        // watch changes with collection
                        scope.$watchCollection(collectionName, function () {
                            // get total totalRows of rows
                            totalRows = scope.$eval(collectionName).length;

                            // set last page
                            grid.lastPage = Math.ceil(totalRows / grid.pageSize);

                            // recreate pagination
                            RenderPagination();
                        });

                        // watch changes with grid pageSize
                        scope.$watch("bsTableSortPagination.pageSize", function () {
                            // recreate pagination
                            RenderPagination();
                        });

                        // set grid properties
                        grid.pageSize = 5;
                        grid.lastPage = Math.ceil(totalRows / grid.pageSize);
                        grid.page = 1;
                        grid.skipAt = (grid.page - 1) * grid.pageSize;

                        pager.children(".select-page-size").change(function () {
                            // get current element
                            var gridLimit = parseInt($(this).val());

                            // update grid properties
                            grid.lastPage = Math.ceil(totalRows / gridLimit);
                            grid.page = 1;
                            grid.skipAt = (grid.page - 1) * gridLimit;
                            scope.$digest();
                        });

                        var RenderPagination = function () {
                            // prepare empty string
                            var paging = "";

                            // create list items
                            for (var i = 0; i < Math.ceil(totalRows / scope.bsTableSortPagination.pageSize) ; i++) {
                                paging += "<li " + (grid.page == (i + 1) ? "class=\"active\"" : "") + "><a ng-href=\"#\">" + (i + 1) + "</a></li>";
                            }

                            // add paging to tfoot of table
                            linkElement.find(".pagination").html(paging);

                            // add event to each list item
                            linkElement.find(".pagination").find("li").bind("click", listenerPagination);
                        }

                        // pagination on click
                        var listenerPagination = function () {
                            // get clicked value
                            var index = parseInt($(this).find("a").text());

                            // remove active class from all elements
                            $(this).parent().find("li").removeClass("active");

                            // add active class to clicked element
                            $(this).addClass("active");

                            // update grid properties
                            grid.page = index;
                            grid.skipAt = (grid.page - 1) * grid.pageSize;

                            // process all $watch(es)
                            scope.$digest();
                        };

                        // add ordering to thead of table
                        var listenerOrder = function () {
                            var sort = $(this).children("span");
                            grid.predicate = $(this).attr("name");
                            grid.reverse = false;
                            if (!sort.hasClass("glyphicon glyphicon-chevron-up") && !sort.hasClass("glyphicon glyphicon-chevron-down")) {
                                headerRow.children("th").children("span").removeClass("glyphicon glyphicon-chevron-up glyphicon glyphicon-chevron-down");
                                sort.addClass("glyphicon glyphicon-chevron-up");
                                grid.reverse = false;
                            } else {
                                if (sort.hasClass("glyphicon glyphicon-chevron-up")) {
                                    grid.reverse = true;
                                } else {
                                    grid.reverse = false;
                                }
                                sort.toggleClass("glyphicon glyphicon-chevron-up");
                                sort.toggleClass("glyphicon glyphicon-chevron-down");
                            }
                            scope.$digest();
                        };

                        // select header column
                        var headerColumn = linkElement.children("thead").children("tr").children("th");

                        // add order function to each header column
                        angular.forEach(headerColumn, function (element) {
                            $(element).click(listenerOrder);
                        });
                    }
                }
            }
        };
    })
    .filter("bsTableSkip", function () {
        return function (array, skipAt) {
            return array.slice(skipAt);
        };
    });
