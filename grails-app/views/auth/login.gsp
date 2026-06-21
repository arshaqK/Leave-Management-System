<!DOCTYPE html>
<html>
<head>
    <meta name="layout" content="main"/>
    <title>Login | Leave Management</title>
</head>
<body>
<div class="container mt-5">
    <div class="row justify-content-center">
        <div class="col-md-4">
            <div class="card shadow">
                <div class="card-header bg-primary text-white text-center">
                    <h4>Leave Management System</h4>
                </div>
                <div class="card-body">

                    <g:if test="${params.error}">
                        <div class="alert alert-danger">
                            Invalid username or password.
                        </div>
                    </g:if>

                    <form action="/login/authenticate" method="post">
                        <div class="mb-3">
                            <label class="form-label">Username</label>
                            <input type="text" name="username" class="form-control"
                                   placeholder="Enter username" required autofocus/>
                        </div>
                        <div class="mb-3">
                            <label class="form-label">Password</label>
                            <input type="password" name="password" class="form-control"
                                   placeholder="Enter password" required/>
                        </div>
                        <div class="d-grid">
                            <button type="submit" class="btn btn-primary">Login</button>
                        </div>
                    </form>

                </div>
            </div>
        </div>
    </div>
</div>
</body>
</html>