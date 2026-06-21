<!DOCTYPE html>
<html>
<head>
    <meta name="layout" content="main"/>
    <title>My Dashboard</title>
</head>
<body>
<h3 class="mb-4">
    <i class="bi bi-speedometer2"></i>
    Welcome, ${employee?.fullName}
</h3>

<div class="row g-4 mb-4">
    <div class="col-md-3">
        <div class="card text-white bg-primary shadow">
            <div class="card-body">
                <div class="d-flex justify-content-between">
                    <div>
                        <h6 class="card-title">Total Applied</h6>
                        <h2>${totalLeaves}</h2>
                    </div>
                    <i class="bi bi-calendar3 fs-1 opacity-50"></i>
                </div>
            </div>
        </div>
    </div>
    <div class="col-md-3">
        <div class="card text-white bg-warning shadow">
            <div class="card-body">
                <div class="d-flex justify-content-between">
                    <div>
                        <h6 class="card-title">Pending</h6>
                        <h2>${pendingLeaves}</h2>
                    </div>
                    <i class="bi bi-hourglass-split fs-1 opacity-50"></i>
                </div>
            </div>
        </div>
    </div>
    <div class="col-md-3">
        <div class="card text-white bg-success shadow">
            <div class="card-body">
                <div class="d-flex justify-content-between">
                    <div>
                        <h6 class="card-title">Approved</h6>
                        <h2>${approvedLeaves}</h2>
                    </div>
                    <i class="bi bi-check-circle fs-1 opacity-50"></i>
                </div>
            </div>
        </div>
    </div>
    <div class="col-md-3">
        <div class="card text-white bg-danger shadow">
            <div class="card-body">
                <div class="d-flex justify-content-between">
                    <div>
                        <h6 class="card-title">Rejected</h6>
                        <h2>${rejectedLeaves}</h2>
                    </div>
                    <i class="bi bi-x-circle fs-1 opacity-50"></i>
                </div>
            </div>
        </div>
    </div>
</div>

<div class="row">
    <div class="col-md-6">
        <div class="card shadow-sm">
            <div class="card-header bg-white fw-semibold">
                <i class="bi bi-lightning text-primary"></i> Quick Actions
            </div>
            <div class="card-body">
                <g:link controller="leave" action="apply"
                        class="btn btn-primary mb-2 w-100">
                    <i class="bi bi-plus-circle"></i> Apply for Leave
                </g:link>
                <g:link controller="leave" action="index"
                        class="btn btn-outline-secondary w-100">
                    <i class="bi bi-clock-history"></i> View Leave History
                </g:link>
            </div>
        </div>
    </div>
</div>
</body>
</html>