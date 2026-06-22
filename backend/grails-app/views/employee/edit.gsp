<!DOCTYPE html>
<html>
<head>
    <meta name="layout" content="main"/>
    <title>Edit Employee</title>
</head>
<body>
<div class="row justify-content-center">
    <div class="col-md-7">
        <div class="card shadow-sm">
            <div class="card-header bg-white fw-semibold">
                <i class="bi bi-pencil"></i> Edit Employee
            </div>
            <div class="card-body">
                <g:form controller="employee" action="update"
                        id="${employee.id}" method="post">
                    <div class="row mb-3">
                        <div class="col">
                            <label class="form-label">Employee ID</label>
                            <input type="text" class="form-control"
                                   value="${employee.employeeId}" disabled/>
                        </div>
                        <div class="col">
                            <label class="form-label">Full Name</label>
                            <input type="text" name="fullName"
                                   class="form-control"
                                   value="${employee.fullName}" required/>
                        </div>
                    </div>
                    <div class="row mb-3">
                        <div class="col">
                            <label class="form-label">Email</label>
                            <input type="email" name="email"
                                   class="form-control"
                                   value="${employee.email}" required/>
                        </div>
                        <div class="col">
                            <label class="form-label">Department</label>
                            <input type="text" name="department"
                                   class="form-control"
                                   value="${employee.department}" required/>
                        </div>
                    </div>
                    <div class="row mb-3">
                        <div class="col">
                            <label class="form-label">Joining Date</label>
                            <input type="date" name="joiningDate"
                                   class="form-control"
                                   value="${employee.joiningDateFormatted}"/>
                        </div>
                        <div class="col">
                            <label class="form-label">Status</label>
                            <select name="status" class="form-select">
                                <option value="Active"
                                        ${employee.status == 'Active' ? 'selected' : ''}>
                                    Active
                                </option>
                                <option value="Inactive"
                                        ${employee.status == 'Inactive' ? 'selected' : ''}>
                                    Inactive
                                </option>
                            </select>
                        </div>
                    </div>
                    <div class="d-flex gap-2">
                        <button type="submit" class="btn btn-warning">
                            <i class="bi bi-check-circle"></i> Update Employee
                        </button>
                        <g:link controller="employee" action="index"
                                class="btn btn-outline-secondary">
                            Cancel
                        </g:link>
                    </div>
                </g:form>
            </div>
        </div>
    </div>
</div>
</body>
</html>