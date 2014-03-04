# bs-table

BsTable is an AngularJS directive which allows pagination, sorting and page size selection with data on client side.

Easy to implement with any theme from http://bootswatch.com/ site.

## working sample

You can find working sample here: http://www.bs-table.com

## how to use

1) Include necessary source files

```
// you can easily implement any bootstrap theme from http://bootswatch.com
<link type="text/css" href="/bootstrap/bootstrap.min.css" rel="stylesheet" />
// include latest jquery.min.js
<script type="text/javascript" src="/js/jquery.min.js"></script>
// include bs-table.min.js
<script type="text/javascript" src="/js/bs-table.min.js"></script>
```

2) Add this css code to your main css file (not necessary)

```
.action-column{ // width of three action buttons
    width: 230px;
}
.table th:hover{
    text-decoration: underline;
    cursor: pointer;
}
.table tfoot .pagination{
    float: right;
    margin: 0;
}
.table tfoot .pagination li{
    cursor: pointer;
}
.table tfoot select{
    width: 90px;
    float: right;
    margin-right: 8px;
}
```

3) Add dependency to your application

```
angular.module("BsTableApplication", ["bsTable"]);
```

4) Add this html code to your template

```
<table class="table table-hover table-bordered" bs-table>
    <tr ng-repeat="contact in contactList">
        <td data-title="First name">{{contact.FirstName}}</td>
        <td data-title="Last name">{{contact.LastName | removeDiacritics}}</td>
        <td data-type="command" class="action-column">
            <button type="button" class="btn btn-info btn-sm" ng-click="Edit(contact)">Edit</button>
        </td>
    </tr>
</table>
```
For columns that contains text use attribute *data-title="Text of title"* and for columns with buttons use *data-type="command"*.

5) Add this js code to your controller

```
// model for bs-table
$scope.contactList = [];

// get contact list
$scope.contactList = GenerateData(40);
```

## license

BsTable is licensed under the MIT license. (http://opensource.org/licenses/MIT)
