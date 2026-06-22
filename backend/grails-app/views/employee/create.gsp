<!DOCTYPE html>
<html>
<head>
    <meta name="layout" content="main"/>
    <title>Add Employee</title>
</head>
<body>
<div class="row justify-content-center">
    <div class="col-md-7">
        <div class="card shadow-sm">
            <div class="card-header bg-white fw-semibold">
                <i class="bi bi-person-plus"></i> Add New Employee
            </div>
            <div class="card-body">
                <g:form controller="employee" action="save" method="post">
                    <div class="row mb-3">
                        <div class="col">
                            <label class="form-label">Employee ID</label>
                            <input type="text" name="employeeId"
                                   class="form-control" required
                                   placeholder="e.g. EMP-003"/>
                        </div>
                        <div class="col">
                            <label class="form-label">Full Name</label>
                            <input type="text" name="fullName"
                                   class="form-control" required/>
                        </div>
                    </div>
                    <div class="row mb-3">
                        <div class="col">
                            <label class="form-label">Email</label>
                            <input type="email" name="email"
                                   class="form-control" required/>
                        </div>
                        <div class="col">
                            <label class="form-label">Department</label>
                            <input type="text" name="department"
                                   class="form-control" required/>
                        </div>
                    </div>
                    <div class="row mb-3">
                        <div class="col">
                            <label class="form-label">Joining Date</label>
                            <input type="date" name="joiningDate"
                                   class="form-control" required/>
                        </div>
                        <div class="col">
                            <label class="form-label">Status</label>
                            <select name="status" class="form-select">
                                <option value="Active">Active</option>
                                <option value="Inactive">Inactive</option>
                            </select>
                        </div>
                    </div>
                    <hr/>
                    <h6 class="text-muted mb-3">Login Credentials</h6>
                    <div class="row mb-3">
                        <div class="col">
                            <label class="form-label">Username</label>
                            <input type="text" name="username"
                                   class="form-control" required/>
                        </div>
                        <div class="col">
                            <label class="form-label">Password</label>
                            <input type="password" name="password"
                                   class="form-control" required/>
                        </div>
                    </div>
                    <div class="d-flex gap-2">
                        <button type="submit" class="btn btn-primary">
                            <i class="bi bi-check-circle"></i> Save Employee
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