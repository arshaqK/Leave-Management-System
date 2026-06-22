package com.leavemanagement

import grails.plugin.springsecurity.annotation.Secured
import grails.converters.JSON

@Secured(['ROLE_ADMIN'])
class EmployeeApiController {

    def employeeService

    def index() {
        render employeeService.listAll() as JSON
    }

    def show(Long id) {
        Employee employee = employeeService.getById(id)
        if (!employee) {
            response.status = 404
            render([error: 'Employee not found'] as JSON)
            return
        }
        render employee as JSON
    }

    def save() {
        try {
            def json = request.JSON
            Employee employee = employeeService.create([
                    employeeId : json.employeeId,
                    fullName   : json.fullName,
                    email      : json.email,
                    department : json.department,
                    joiningDate: java.sql.Date.valueOf(json.joiningDate),
                    status     : json.status ?: 'Active',
                    username   : json.username,
                    password   : json.password
            ])
            response.status = 201
            render employee as JSON
        } catch (Exception e) {
            response.status = 400
            render([error: e.message] as JSON)
        }
    }

    def update(Long id) {
        try {
            def json = request.JSON
            Employee employee = employeeService.update(id, [
                    fullName   : json.fullName,
                    email      : json.email,
                    department : json.department,
                    joiningDate: java.sql.Date.valueOf(json.joiningDate),
                    status     : json.status
            ])
            render employee as JSON
        } catch (Exception e) {
            response.status = 400
            render([error: e.message] as JSON)
        }
    }

    def delete(Long id) {
        try {
            employeeService.deactivate(id)
            render([message: 'Employee deactivated successfully'] as JSON)
        } catch (Exception e) {
            response.status = 400
            render([error: e.message] as JSON)
        }
    }
}