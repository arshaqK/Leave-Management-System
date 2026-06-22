<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1"/>
    <title><g:layoutTitle default="Leave Management System"/></title>
    <asset:stylesheet src="webjars/bootstrap/5.3.8/dist/css/bootstrap.css"/>
    <asset:stylesheet src="webjars/bootstrap-icons/1.13.1/font/bootstrap-icons.css"/>
    <g:layoutHead/>
</head>
<body>

<!-- Navbar -->
<sec:ifLoggedIn>
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
        <div class="container-fluid">
            <a class="navbar-brand fw-bold" href="/dashboard/index">
                <i class="bi bi-calendar-check"></i> Leave Management
            </a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                    data-bs-target="#navbarNav">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav me-auto">
                    <li class="nav-item">
                        <g:link controller="dashboard" action="index"
                                class="nav-link">
                            <i class="bi bi-speedometer2"></i> Dashboard
                        </g:link>
                    </li>
                    <sec:ifAllGranted roles="ROLE_ADMIN">
                        <li class="nav-item">
                            <g:link controller="employee" action="index"
                                    class="nav-link">
                                <i class="bi bi-people"></i> Employees
                            </g:link>
                        </li>
                        <li class="nav-item">
                            <g:link controller="leave" action="pending"
                                    class="nav-link">
                                <i class="bi bi-clock-history"></i> Leave Requests
                            </g:link>
                        </li>
                        <li class="nav-item">
                            <g:link controller="report" action="index"
                                    class="nav-link">
                                <i class="bi bi-bar-chart"></i> Reports
                            </g:link>
                        </li>
                    </sec:ifAllGranted>
                    <sec:ifAllGranted roles="ROLE_EMPLOYEE">
                        <li class="nav-item">
                            <g:link controller="leave" action="index"
                                    class="nav-link">
                                <i class="bi bi-calendar3"></i> My Leaves
                            </g:link>
                        </li>
                        <li class="nav-item">
                            <g:link controller="leave" action="apply"
                                    class="nav-link">
                                <i class="bi bi-plus-circle"></i> Apply Leave
                            </g:link>
                        </li>
                    </sec:ifAllGranted>
                </ul>
                <ul class="navbar-nav">
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="#"
                           data-bs-toggle="dropdown">
                            <i class="bi bi-person-circle"></i>
                            <sec:username/>
                        </a>
                        <ul class="dropdown-menu dropdown-menu-end">
                            <li>
                                <a class="dropdown-item text-danger"
                                   href="/logoff">
                                    <i class="bi bi-box-arrow-right"></i> Logout
                                </a>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</sec:ifLoggedIn>

<!-- Flash messages -->
<div class="container mt-3">
    <g:if test="${flash.message}">
        <div class="alert alert-success alert-dismissible fade show">
            ${flash.message}
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        </div>
    </g:if>
    <g:if test="${flash.error}">
        <div class="alert alert-danger alert-dismissible fade show">
            ${flash.error}
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        </div>
    </g:if>
</div>

<!-- Page content -->
<div class="container mt-3">
    <g:layoutBody/>
</div>

<asset:javascript src="webjars/jquery/*/dist/jquery.js"/>
<asset:javascript src="webjars/bootstrap/5.3.8/dist/js/bootstrap.bundle.js"/>
</body>
</html>