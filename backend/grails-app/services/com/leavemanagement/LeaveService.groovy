package com.leavemanagement

import grails.gorm.transactions.Transactional

@Transactional
class LeaveService {

    def springSecurityService
    def emailService

    LeaveRequest apply(Map params, Employee employee) {
        String currentUser = springSecurityService.currentUser?.username ?: 'system'

        // Check for overlapping leave requests
        if (hasOverlap(employee, params.startDate, params.endDate)) {
            throw new RuntimeException('You already have a leave request overlapping these dates.')
        }

        LeaveRequest leave = new LeaveRequest(
                employee:   employee,
                leaveType:  params.leaveType,
                startDate:  params.startDate,
                endDate:    params.endDate,
                reason:     params.reason,
                status:     'Pending',
                createdBy:  currentUser,
                modifiedBy: currentUser
        ).save(failOnError: true)

        AuditLog.withNewTransaction {
            new AuditLog(
                    entityName:  'LeaveRequest',
                    entityId:    leave.id,
                    action:      'CREATE',
                    performedBy: currentUser,
                    details:     "Leave applied: ${leave.leaveType} from ${leave.startDate} to ${leave.endDate}",
                    dateCreated: new Date()
            ).save(failOnError: true)
        }

        emailService.sendLeaveSubmitted(leave)
        leave
    }

    LeaveRequest cancel(Long id) {
        String currentUser = springSecurityService.currentUser?.username ?: 'system'
        LeaveRequest leave = LeaveRequest.get(id)

        if (!leave) throw new RuntimeException("Leave request not found.")
        if (leave.status != 'Pending') throw new RuntimeException("Only pending requests can be cancelled.")

        leave.status     = 'Cancelled'
        leave.modifiedBy = currentUser
        leave.save(failOnError: true)

        AuditLog.withNewTransaction {
            new AuditLog(
                    entityName:  'LeaveRequest',
                    entityId:    leave.id,
                    action:      'UPDATE',
                    performedBy: currentUser,
                    details:     "Leave cancelled by ${currentUser}",
                    dateCreated: new Date()
            ).save(failOnError: true)
        }

        leave
    }

    LeaveRequest approve(Long id, String remarks) {
        String currentUser = springSecurityService.currentUser?.username ?: 'system'
        User decidedBy = springSecurityService.currentUser
        LeaveRequest leave = LeaveRequest.get(id)

        if (!leave) throw new RuntimeException("Leave request not found.")
        if (leave.status != 'Pending') throw new RuntimeException("Only pending requests can be approved.")

        leave.status       = 'Approved'
        leave.remarks      = remarks
        leave.decisionDate = new Date()
        leave.decidedBy    = decidedBy
        leave.modifiedBy   = currentUser
        leave.save(failOnError: true)

        AuditLog.withNewTransaction {
            new AuditLog(
                    entityName:  'LeaveRequest',
                    entityId:    leave.id,
                    action:      'UPDATE',
                    performedBy: currentUser,
                    details:     "Leave approved by ${currentUser}",
                    dateCreated: new Date()
            ).save(failOnError: true)
        }

        emailService.sendLeaveApproved(leave)
        leave
    }

    LeaveRequest reject(Long id, String remarks) {
        String currentUser = springSecurityService.currentUser?.username ?: 'system'
        User decidedBy = springSecurityService.currentUser
        LeaveRequest leave = LeaveRequest.get(id)

        if (!leave) throw new RuntimeException("Leave request not found.")
        if (leave.status != 'Pending') throw new RuntimeException("Only pending requests can be rejected.")

        leave.status       = 'Rejected'
        leave.remarks      = remarks
        leave.decisionDate = new Date()
        leave.decidedBy    = decidedBy
        leave.modifiedBy   = currentUser
        leave.save(failOnError: true)

        AuditLog.withNewTransaction {
            new AuditLog(
                    entityName:  'LeaveRequest',
                    entityId:    leave.id,
                    action:      'UPDATE',
                    performedBy: currentUser,
                    details:     "Leave rejected by ${currentUser}",
                    dateCreated: new Date()
            ).save(failOnError: true)
        }

        emailService.sendLeaveRejected(leave)
        leave
    }

    List<LeaveRequest> listByEmployee(Employee employee) {
        LeaveRequest.findAllByEmployee(employee, [sort: 'dateCreated', order: 'desc'])
    }

    List<LeaveRequest> listPending() {
        LeaveRequest.findAllByStatus('Pending', [sort: 'dateCreated', order: 'asc'])
    }

    List<LeaveRequest> listApprovedThisMonth() {
        Calendar cal = Calendar.getInstance()
        cal.set(Calendar.DAY_OF_MONTH, 1)
        cal.set(Calendar.HOUR_OF_DAY, 0)
        cal.set(Calendar.MINUTE, 0)
        cal.set(Calendar.SECOND, 0)
        cal.set(Calendar.MILLISECOND, 0)
        Date start = cal.time
        Date end = new Date()
        LeaveRequest.findAllByStatusAndDecisionDateBetween('Approved', start, end)
    }

    boolean hasOverlap(Employee employee, Date startDate, Date endDate) {
        LeaveRequest.createCriteria().count {
            eq('employee', employee)
            not { inList('status', ['Cancelled', 'Rejected']) }
            or {
                between('startDate', startDate, endDate)
                between('endDate', startDate, endDate)
                and {
                    le('startDate', startDate)
                    ge('endDate', endDate)
                }
            }
        } > 0
    }

    // Dashboard counts
    int countByEmployeeAndStatus(Employee employee, String status) {
        LeaveRequest.countByEmployeeAndStatus(employee, status)
    }

    int countTotalByEmployee(Employee employee) {
        LeaveRequest.countByEmployeeAndStatus(employee, 'Approved')
    }

    int countPending() {
        LeaveRequest.countByStatus('Pending')
    }
}