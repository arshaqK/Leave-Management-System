<!DOCTYPE html>
<html>
<head>
    <meta name="layout" content="main"/>
    <title>Employees</title>
</head>
<body>
<div class="d-flex justify-content-between align-items-center mb-4">
    <h3><i class="bi bi-people"></i> Employees</h3>
    <g:link controller="employee" action="create"
            class="btn btn-primary">
        <i class="bi bi-person-plus"></i> Add Employee
    </g:link>
</div>

<div class="card shadow-sm">
    <div class="card-body p-0">
        <table class="table table-hover mb-0">
            <thead class="table-light">
            <tr>
                <th>Employee ID</th>
                <th>Full Name</th>
                <th>Email</th>
                <th>Department</th>
                <th>Joining Date</th>
                <th>Status</th>
                <th>Actions</th>
            </tr>
            </thead>
            <tbody>
            <g:each in="${employees}" var="emp">
                <tr>
                    <td>${emp.employeeId}</td>
                    <td>${emp.fullName}</td>
                    <td>${emp.email}</td>
                    <td>${emp.department}</td>
                    <td><g:formatDate date="${emp.joiningDate}" format="dd-MM-yyyy"/></td>
                    <td>
                        <span class="badge ${emp.status == 'Active' ? 'bg-success' : 'bg-secondary'}">
                            ${emp.status}
                        </span>
                    </td>
                    <td>
                        <g:link controller="employee" action="show"
                                id="${emp.id}"
                                class="btn btn-sm btn-info">
                            <i class="bi bi-eye"></i>
                        </g:link>
                        <g:link controller="employee" action="edit"
                                id="${emp.id}"
                                class="btn btn-sm btn-warning">
                            <i class="bi bi-pencil"></i>
                        </g:link>
                        <g:if test="${emp.status == 'Active'}">
                            <g:link controller="employee" action="deactivate"
                                    id="${emp.id}"
                                    class="btn btn-sm btn-danger"
                                    onclick="return confirm('Deactivate this employee?')">
                                <i class="bi bi-person-x"></i>
                            </g:link>
                        </g:if>
                    </td>
                </tr>
            </g:each>
            <g:if test="${!employees}">
                <tr>
                    <td colspan="7" class="text-center text-muted py-4">
                        No employees found.
                    </td>
                </tr>
            </g:if>
            </tbody>
        </table>
    </div>
</div>
</body>
</html>