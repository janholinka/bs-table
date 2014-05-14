# bs-table

BsTable is an AngularJS directive which adds tfoot tag with pagination and page size selection to your table and **watches changes** on your collection in **ng-repeat** attribute.

## working sample

You can find working sample here: http://bs-table.com

## how to use

1) Include necessary source files

```
// add bootstrap theme from http://bootswatch.com
<link type="text/css" href="/bootstrap/bootstrap.min.css" rel="stylesheet" />
// include latest jquery.min.js
<script type="text/javascript" src="/js/jquery.min.js"></script>
// include bs-table.min.js
<script type="text/javascript" src="/js/bs-table.min.js"></script>
```

2) Import module to your application

```
angular.module("BsTableApplication", ["bsTable"]);
```

3) Add this html code to your template

```
<table class="table table-hover table-bordered" bs-table>
    <thead>
        <tr>
            <th ng-click="predicate='FirstName'; reverse=!reverse">First name</th>
            <th ng-click="predicate='LastName'; reverse=!reverse">Last name</th>
            <th>Actions</th>
        </tr>
    </thead>
    <tbody> // you can use ng-repeat in tbody as below in tr html tag
        <tr ng-repeat="contact in contactList | orderBy:predicate:reverse">
            <td>{{contact.FirstName}}</td>
            <td>{{contact.LastName}}</td>
            <td class="action-column">
                <button type="button" class="btn btn-info btn-sm" ng-click="Edit(contact)">Edit</button>
            </td>
        </tr>
    </tbody>
</table>
```

**READ ME**: It is possible to use ng-repeat attribute in **tr** or **tbody** tag. 

4) Add this js code to your controller

```
// model for bs-table
$scope.contactList = [];

// get contact list
$scope.contactList = SomeService.GetAll();
```
5) Additional css code (not necessary)

```
.table th:hover{
    text-decoration: underline;
    cursor: pointer;
}
.table .action-column{
    width: 230px;
}
.table .action-column:hover{
    text-decoration: none;
    cursor: default;
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

## license

BsTable is licensed under the MIT license. (http://opensource.org/licenses/MIT)
