<!DOCTYPE html>
<html>
<head>
    <meta name="layout" content="main"/>
    <title>Reports</title>
</head>
<body>
<h3 class="mb-4"><i class="bi bi-bar-chart"></i> Reports</h3>

<div class="row g-4">
    <!-- Leaves by Department -->
    <div class="col-md-6">
        <div class="card shadow-sm">
            <div class="card-header bg-white fw-semibold">
                <i class="bi bi-building"></i> Leaves by Department
            </div>
            <div class="card-body p-0">
                <table class="table mb-0">
                    <thead class="table-light">
                    <tr>
                        <th>Department</th>
                        <th>Total Leaves</th>
                    </tr>
                    </thead>
                    <tbody>
                    <g:each in="${leavesByDepartment}" var="row">
                        <tr>
                            <td>${row[0]}</td>
                            <td>${row[1]}</td>
                        </tr>
                    </g:each>
                    <g:if test="${!leavesByDepartment}">
                        <tr>
                            <td colspan="2" class="text-center text-muted py-3">
                                No data available.
                            </td>
                        </tr>
                    </g:if>
                    </tbody>
                </table>
            </div>
        </div>
    </div>

    <!-- Leaves by Month -->
    <div class="col-md-6">
        <div class="card shadow-sm">
            <div class="card-header bg-white fw-semibold">
                <i class="bi bi-calendar-month"></i> Leaves by Month
            </div>
            <div class="card-body p-0">
                <table class="table mb-0">
                    <thead class="table-light">
                    <tr>
                        <th>Month</th>
                        <th>Total Leaves</th>
                    </tr>
                    </thead>
                    <tbody>
                    <g:each in="${leavesByMonth}" var="row">
                        <tr>
                            <td>
                                <g:formatDate
                                    date="${new Date(new Date().year,
                                           (row[0] as int) - 1, 1)}"
                                    format="MMMM"/>
                            </td>
                            <td>${row[1]}</td>
                        </tr>
                    </g:each>
                    <g:if test="${!leavesByMonth}">
                        <tr>
                            <td colspan="2" class="text-center text-muted py-3">
                                No data available.
                            </td>
                        </tr>
                    </g:if>
                    </tbody>
                </table>
            </div>
        </div>
    </div>

    <!-- Top Employees -->
    <div class="col-md-12">
        <div class="card shadow-sm">
            <div class="card-header bg-white fw-semibold">
                <i class="bi bi-trophy"></i> Top Employees by Leave Usage
            </div>
            <div class="card-body p-0">
                <table class="table mb-0">
                    <thead class="table-light">
                    <tr>
                        <th>#</th>
                        <th>Employee</th>
                        <th>Department</th>
                        <th>Total Leaves</th>
                    </tr>
                    </thead>
                    <tbody>
                    <g:each in="${topEmployees}" var="row" status="i">
                        <tr>
                            <td>${i + 1}</td>
                            <td>${row[0]?.fullName}</td>
                            <td>${row[0]?.department}</td>
                            <td>${row[1]}</td>
                        </tr>
                    </g:each>
                    <g:if test="${!topEmployees}">
                        <tr>
                            <td colspan="4" class="text-center text-muted py-3">
                                No data available.
                            </td>
                        </tr>
                    </g:if>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</div>
</body>
</html>