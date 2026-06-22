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

        List<LeaveRequest> requests
        if (isAdmin) {
            requests = LeaveRequest.list()
        } else {
            Employee employee = employeeService.getByUser(currentUser)
            requests = leaveService.listByEmployee(employee)
        }

        def result = requests.collect { req ->
            [
                id: req.id,
                leaveType: req.leaveType,
                startDate: req.startDate,
                endDate: req.endDate,
                reason: req.reason,
                status: req.status,
                remarks: req.remarks,
                decisionDate: req.decisionDate,
                dateCreated: req.dateCreated,
                lastUpdated: req.lastUpdated,
                employee: req.employee ? [
                    id: req.employee.id,
                    employeeId: req.employee.employeeId,
                    fullName: req.employee.fullName,
                    email: req.employee.email,
                    department: req.employee.department,
                    status: req.employee.status
                ] : null
            ]
        }
        render result as JSON
    }

    def save() {
        try {
            def json = request.JSON
            User currentUser = springSecurityService.currentUser
            Employee employee = employeeService.getByUser(currentUser)

            LeaveRequest leave = leaveService.apply([
                    leaveType: json.leaveType,
                    startDate: java.sql.Date.valueOf(json.startDate),
                    endDate  : java.sql.Date.valueOf(json.endDate),
                    reason   : json.reason
            ], employee)

            response.status = 201
            render leave as JSON
        } catch (Exception e) {
            response.status = 400
            render([error: e.message] as JSON)
        }
    }

    def cancel(Long id) {
        try {
            LeaveRequest leave = leaveService.cancel(id)
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