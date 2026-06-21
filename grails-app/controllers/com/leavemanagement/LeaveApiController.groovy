package com.leavemanagement

import grails.plugin.springsecurity.annotation.Secured
import grails.converters.JSON

@Secured(['ROLE_ADMIN', 'ROLE_EMPLOYEE'])
class LeaveApiController {

    def leaveService
    def employeeService
    def springSecurityService

    def index() {
        User currentUser = springSecurityService.currentUser
        boolean isAdmin = currentUser.authorities.any { it.authority == 'ROLE_ADMIN' }

        if (isAdmin) {
            render LeaveRequest.list() as JSON
        } else {
            Employee employee = employeeService.getByUser(currentUser)
            render leaveService.listByEmployee(employee) as JSON
        }
    }

    def save() {
        try {
            def json = request.JSON
            User currentUser = springSecurityService.currentUser
            Employee employee = employeeService.getByUser(currentUser)

            LeaveRequest leave = leaveService.apply([
                    leaveType: json.leaveType,
                    startDate: Date.parse('yyyy-MM-dd', json.startDate),
                    endDate  : Date.parse('yyyy-MM-dd', json.endDate),
                    reason   : json.reason
            ], employee)

            response.status = 201
            render leave as JSON
        } catch (Exception e) {
            response.status = 400
            render([error: e.message] as JSON)
        }
    }

    @Secured(['ROLE_ADMIN'])
    def approve(Long id) {
        try {
            def json = request.JSON
            LeaveRequest leave = leaveService.approve(id, json.remarks)
            render leave as JSON
        } catch (Exception e) {
            response.status = 400
            render([error: e.message] as JSON)
        }
    }

    @Secured(['ROLE_ADMIN'])
    def reject(Long id) {
        try {
            def json = request.JSON
            LeaveRequest leave = leaveService.reject(id, json.remarks)
            render leave as JSON
        } catch (Exception e) {
            response.status = 400
            render([error: e.message] as JSON)
        }
    }
}