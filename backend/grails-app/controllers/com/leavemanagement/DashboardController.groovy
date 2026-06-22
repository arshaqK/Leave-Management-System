package com.leavemanagement

import grails.plugin.springsecurity.annotation.Secured

@Secured(['ROLE_ADMIN', 'ROLE_EMPLOYEE'])
class DashboardController {

    def employeeService
    def leaveService
    def springSecurityService

    def index() {
        User currentUser = springSecurityService.currentUser
        boolean isAdmin = currentUser.authorities.any { it.authority == 'ROLE_ADMIN' }

        if (isAdmin) {
            render view: 'adminDashboard', model: [
                    totalEmployees  : employeeService.countAll(),
                    activeEmployees : employeeService.countActive(),
                    pendingLeaves   : leaveService.countPending(),
                    approvedThisMonth: leaveService.listApprovedThisMonth().size()
            ]
        } else {
            Employee employee = employeeService.getByUser(currentUser)
            render view: 'employeeDashboard', model: [
                    employee       : employee,
                    totalLeaves    : leaveService.countTotalByEmployee(employee),
                    pendingLeaves  : leaveService.countByEmployeeAndStatus(employee, 'Pending'),
                    approvedLeaves : leaveService.countByEmployeeAndStatus(employee, 'Approved'),
                    rejectedLeaves : leaveService.countByEmployeeAndStatus(employee, 'Rejected')
            ]
        }
    }
}