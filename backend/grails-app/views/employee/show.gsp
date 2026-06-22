<!DOCTYPE html>
<html>
<head>
    <meta name="layout" content="main"/>
    <title>Employee Details</title>
</head>
<body>
<div class="row justify-content-center">
    <div class="col-md-7">
        <div class="card shadow-sm">
            <div class="card-header bg-white fw-semibold d-flex justify-content-between">
                <span><i class="bi bi-person-badge"></i> Employee Details</span>
                <g:link controller="employee" action="index"
                        class="btn btn-sm btn-outline-secondary">
                    Back to List
                </g:link>
            </div>
            <div class="card-body">
                <table class="table table-borderless">
                    <tr>
                        <th width="35%">Employee ID</th>
                        <td>${employee.employeeId}</td>
                    </tr>
                    <tr>
                        <th>Full Name</th>
                        <td>${employee.fullName}</td>
                    </tr>
                    <tr>
                        <th>Email</th>
                        <td>${employee.email}</td>
                    </tr>
                    <tr>
                        <th>Department</th>
                        <td>${employee.department}</td>
                    </tr>
                    <tr>
                        <th>Joining Date</th>
                        <td>
                            <g:formatDate date="${employee.joiningDate}"
                                          format="dd-MM-yyyy"/>
                        </td>
                    </tr>
                    <tr>
                        <th>Status</th>
                        <td>
                            <span class="badge ${employee.status == 'Active' ?
                                    'bg-success' : 'bg-secondary'}">
                                ${employee.status}
                            </span>
                        </td>
                    </tr>
                    <tr>
                        <th>Username</th>
                        <td>${employee.user?.username}</td>
                    </tr>
                </table>
                <div class="d-flex gap-2 mt-3">
                    <g:link controller="employee" action="edit"
                            id="${employee.id}"
                            class="btn btn-warning">
                        <i class="bi bi-pencil"></i> Edit
                    </g:link>
                    <g:if test="${employee.status == 'Active'}">
                        <g:link controller="employee" action="deactivate"
                                id="${employee.id}"
                                class="btn btn-danger"
                                onclick="return confirm('Deactivate this employee?')">
                            <i class="bi bi-person-x"></i> Deactivate
                        </g:link>
                    </g:if>
                </div>
            </div>
        </div>
    </div>
</div>
</body>
</html>