package com.leavemanagement

import grails.plugin.springsecurity.annotation.Secured

@Secured(['ROLE_ADMIN', 'ROLE_EMPLOYEE'])
class LeaveController {

    def leaveService
    def employeeService
    def springSecurityService

    def index() {
        User currentUser = springSecurityService.currentUser
        Employee employee = employeeService.getByUser(currentUser)
        [leaves: leaveService.listByEmployee(employee), employee: employee]
    }

    def apply() {
        [leaveTypes: ['Annual', 'Sick', 'Casual']]
    }

    def save() {
        try {
            User currentUser = springSecurityService.currentUser
            Employee employee = employeeService.getByUser(currentUser)

            Date startDate = Date.parse('yyyy-MM-dd', params.startDate)
            Date endDate   = Date.parse('yyyy-MM-dd', params.endDate)

            leaveService.apply([
                    leaveType: params.leaveType,
                    startDate: startDate,
                    endDate  : endDate,
                    reason   : params.reason
            ], employee)

            flash.message = "Leave request submitted successfully"
            redirect action: 'index'
        } catch (Exception e) {
            flash.error = "Error submitting leave: ${e.message}"
            redirect action: 'apply'
        }
    }

    def cancel(Long id) {
        try {
            leaveService.cancel(id)
            flash.message = "Leave request cancelled"
        } catch (Exception e) {
            flash.error = "Error cancelling leave: ${e.message}"
        }
        redirect action: 'index'
    }

    // Admin actions
    @Secured(['ROLE_ADMIN'])
    def pending() {
        [leaves: leaveService.listPending()]
    }

    @Secured(['ROLE_ADMIN'])
    def approve(Long id) {
        try {
            leaveService.approve(id, params.remarks)
            flash.message = "Leave request approved"
        } catch (Exception e) {
            flash.error = "Error approving leave: ${e.message}"
        }
        redirect action: 'pending'
    }

    @Secured(['ROLE_ADMIN'])
    def reject(Long id) {
        try {
            leaveService.reject(id, params.remarks)
            flash.message = "Leave request rejected"
        } catch (Exception e) {
            flash.error = "Error rejecting leave: ${e.message}"
        }
        redirect action: 'pending'
    }
}