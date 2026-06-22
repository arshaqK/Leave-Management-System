package com.leavemanagement

import grails.converters.JSON
import grails.plugin.springsecurity.annotation.Secured

@Secured(['ROLE_ADMIN', 'ROLE_EMPLOYEE'])
class DashboardApiController {

    def employeeService
    def leaveService
    def springSecurityService

    @Secured(['ROLE_ADMIN'])
    def admin() {
        render([
            totalEmployees  : employeeService.countAll(),
            activeEmployees : employeeService.countActive(),
            pendingLeaves   : leaveService.countPending(),
            approvedThisMonth: leaveService.listApprovedThisMonth().size()
        ] as JSON)
    }

    @Secured(['ROLE_EMPLOYEE'])
    def employee() {
        User currentUser = springSecurityService.currentUser
        Employee employee = employeeService.getByUser(currentUser)
        render([
            totalLeaves   : leaveService.countTotalByEmployee(employee),
            pendingLeaves : leaveService.countByEmployeeAndStatus(employee, 'Pending'),
            approvedLeaves: leaveService.countByEmployeeAndStatus(employee, 'Approved'),
            rejectedLeaves: leaveService.countByEmployeeAndStatus(employee, 'Rejected')
        ] as JSON)
    }
}