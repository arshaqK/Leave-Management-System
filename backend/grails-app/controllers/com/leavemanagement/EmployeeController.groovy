package com.leavemanagement

import grails.plugin.springsecurity.annotation.Secured

@Secured(['ROLE_ADMIN'])
class EmployeeController {

    def employeeService

    def index() {
        [employees: employeeService.listAll()]
    }

    def show(Long id) {
        Employee employee = employeeService.getById(id)
        if (!employee) {
            flash.message = "Employee not found"
            redirect action: 'index'
            return
        }
        [employee: employee]
    }

    def create() {
        [employee: new Employee()]
    }

    def save() {
        try {
            Date joiningDate = params.joiningDate ?
                java.sql.Date.valueOf(params.joiningDate) : new Date()      

            Employee employee = employeeService.create([
                    employeeId : params.employeeId,
                    fullName   : params.fullName,
                    email      : params.email,
                    department : params.department,
                    joiningDate: joiningDate,
                    status     : params.status ?: 'Active',
                    username   : params.username,
                    password   : params.password
            ])

            flash.message = "Employee ${employee.fullName} created successfully"
            redirect action: 'index'
        } catch (Exception e) {
            flash.error = "Error creating employee: ${e.message}"
            redirect action: 'create'
        }
    }

    def edit(Long id) {
        Employee employee = employeeService.getById(id)
        if (!employee) {
            flash.message = "Employee not found"
            redirect action: 'index'
            return
        }
        [employee: employee]
    }

    def update(Long id) {
        try {
            Date joiningDate = params.joiningDate ?
                java.sql.Date.valueOf(params.joiningDate) : null

            Employee employee = employeeService.update(id, [
                    fullName   : params.fullName,
                    email      : params.email,
                    department : params.department,
                    joiningDate: joiningDate,
                    status     : params.status
            ])

            flash.message = "Employee ${employee.fullName} updated successfully"
            redirect action: 'index'
        } catch (Exception e) {
            flash.error = "Error updating employee: ${e.message}"
            redirect action: 'edit', id: id
        }
    }

    def deactivate(Long id) {
        try {
            Employee employee = employeeService.deactivate(id)
            flash.message = "Employee ${employee.fullName} deactivated"
        } catch (Exception e) {
            flash.error = "Error deactivating employee: ${e.message}"
        }
        redirect action: 'index'
    }
}