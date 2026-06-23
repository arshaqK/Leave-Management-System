package leavemanagement

class UrlMappings {

    static mappings = {

        "/"(controller: 'auth', action: 'login')

        "/auth/login"(controller: 'auth', action: 'login')
        "/auth/logout"(controller: 'auth', action: 'logout')

        "/dashboard/$action?"(controller: 'dashboard')

        "/employee/$action?/$id?"(controller: 'employee')

        "/leave/$action?/$id?"(controller: 'leave')

        "/report/$action?"(controller: 'report')

        "/api/employees"(controller: 'employeeApi') {
            action = [GET: 'index', POST: 'save']
        }
        "/api/employees/$id"(controller: 'employeeApi') {
            action = [GET: 'show', PUT: 'update', DELETE: 'delete']
        }

        "/api/leaves"(controller: 'leaveApi') {
            action = [GET: 'index', POST: 'save']
        }
        "/api/leaves/$id/approve"(controller: 'leaveApi') {
            action = [PUT: 'approve']
        }
        "/api/leaves/$id/reject"(controller: 'leaveApi') {
            action = [PUT: 'reject']
        }

        "/api/leaves/$id/cancel"(controller: 'leaveApi') {
            action = [PUT: 'cancel']
        }
        
        "/api/audit/all"(controller: 'auditApi', action: 'all')
        "/api/audit"(controller: 'auditApi', action: 'index')
        

        "/api/me"(controller: 'authApi', action: 'me')
        "/api/dashboard/admin"(controller: 'dashboardApi', action: 'admin')
        "/api/dashboard/employee"(controller: 'dashboardApi', action: 'employee')
        "/api/reports"(controller: 'report', action: 'apiIndex')
        "500"(view: '/error')
        "404"(view: '/notFound')
    }
}