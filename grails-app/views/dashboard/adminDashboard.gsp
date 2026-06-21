<!DOCTYPE html>
<html>
<head>
    <meta name="layout" content="main"/>
    <title>Admin Dashboard</title>
</head>
<body>
<h3 class="mb-4"><i class="bi bi-speedometer2"></i> Admin Dashboard</h3>

<div class="row g-4 mb-4">
    <div class="col-md-3">
        <div class="card text-white bg-primary shadow">
            <div class="card-body">
                <div class="d-flex justify-content-between">
                    <div>
                        <h6 class="card-title">Total Employees</h6>
                        <h2>${totalEmployees}</h2>
                    </div>
                    <i class="bi bi-people fs-1 opacity-50"></i>
                </div>
            </div>
        </div>
    </div>
    <div class="col-md-3">
        <div class="card text-white bg-success shadow">
            <div class="card-body">
                <div class="d-flex justify-content-between">
                    <div>
                        <h6 class="card-title">Active Employees</h6>
                        <h2>${activeEmployees}</h2>
                    </div>
                    <i class="bi bi-person-check fs-1 opacity-50"></i>
                </div>
            </div>
        </div>
    </div>
    <div class="col-md-3">
        <div class="card text-white bg-warning shadow">
            <div class="card-body">
                <div class="d-flex justify-content-between">
                    <div>
                        <h6 class="card-title">Pending Requests</h6>
                        <h2>${pendingLeaves}</h2>
                    </div>
                    <i class="bi bi-clock-history fs-1 opacity-50"></i>
                </div>
            </div>
        </div>
    </div>
    <div class="col-md-3">
        <div class="card text-white bg-info shadow">
            <div class="card-body">
                <div class="d-flex justify-content-between">
                    <div>
                        <h6 class="card-title">Approved This Month</h6>
                        <h2>${approvedThisMonth}</h2>
                    </div>
                    <i class="bi bi-calendar-check fs-1 opacity-50"></i>
                </div>
            </div>
        </div>
    </div>
</div>

<div class="row">
    <div class="col-md-6">
        <div class="card shadow-sm">
            <div class="card-header bg-white fw-semibold">
                <i class="bi bi-clock-history text-warning"></i> Quick Actions
            </div>
            <div class="card-body">
                <g:link controller="leave" action="pending"
                        class="btn btn-warning mb-2 w-100">
                    <i class="bi bi-list-check"></i>
                    View Pending Leave Requests (${pendingLeaves})
                </g:link>
                <g:link controller="employee" action="create"
                        class="btn btn-primary mb-2 w-100">
                    <i class="bi bi-person-plus"></i> Add New Employee
                </g:link>
                <g:link controller="report" action="index"
                        class="btn btn-info w-100">
                    <i class="bi bi-bar-chart"></i> View Reports
                </g:link>
            </div>
        </div>
    </div>
</div>
</body>
</html>