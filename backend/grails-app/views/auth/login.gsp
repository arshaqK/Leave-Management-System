<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1"/>
    <title>Login | Leave Management</title>
    <asset:stylesheet src="webjars/bootstrap/5.3.8/dist/css/bootstrap.css"/>
    <asset:stylesheet src="webjars/bootstrap-icons/1.13.1/font/bootstrap-icons.css"/>
</head>
<body class="bg-light">
<div class="container mt-5">
    <div class="row justify-content-center">
        <div class="col-md-4">
            <div class="card shadow">
                <div class="card-header bg-primary text-white text-center py-3">
                    <i class="bi bi-calendar-check fs-3"></i>
                    <h4 class="mb-0 mt-1">Leave Management</h4>
                </div>
                <div class="card-body p-4">
                    <g:if test="${params.error}">
                        <div class="alert alert-danger">
                            <i class="bi bi-exclamation-circle"></i>
                            Invalid username or password.
                        </div>
                    </g:if>
                    <form action="/login/authenticate" method="post">
                        <div class="mb-3">
                            <label class="form-label fw-semibold">Username</label>
                            <div class="input-group">
                                <span class="input-group-text">
                                    <i class="bi bi-person"></i>
                                </span>
                                <input type="text" name="username"
                                       class="form-control"
                                       placeholder="Enter username"
                                       required autofocus/>
                            </div>
                        </div>
                        <div class="mb-4">
                            <label class="form-label fw-semibold">Password</label>
                            <div class="input-group">
                                <span class="input-group-text">
                                    <i class="bi bi-lock"></i>
                                </span>
                                <input type="password" name="password"
                                       class="form-control"
                                       placeholder="Enter password"
                                       required/>
                            </div>
                        </div>
                        <div class="d-grid">
                            <button type="submit" class="btn btn-primary btn-lg">
                                <i class="bi bi-box-arrow-in-right"></i> Login
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>
<asset:javascript src="webjars/bootstrap/5.3.8/dist/js/bootstrap.bundle.js"/>
</body>
</html>