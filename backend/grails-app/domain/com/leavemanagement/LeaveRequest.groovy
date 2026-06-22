package com.leavemanagement

class LeaveRequest {

    Employee employee
    String leaveType
    Date startDate
    Date endDate
    String reason
    String status = 'Pending'

    // Approval fields
    String remarks
    Date decisionDate
    User decidedBy

    Date dateCreated
    Date lastUpdated
    String createdBy
    String modifiedBy

    static constraints = {
        leaveType blank: false, inList: ['Annual', 'Sick', 'Casual']
        startDate nullable: false
        endDate nullable: false, validator: { val, obj ->
            if (val && obj.startDate && val.before(obj.startDate)) {
                return 'leaveRequest.endDate.beforeStartDate'
            }
        }
        reason blank: false, minSize: 10, maxSize: 500
        status inList: ['Pending', 'Approved', 'Rejected', 'Cancelled']
        remarks nullable: true, maxSize: 500
        decisionDate nullable: true
        decidedBy nullable: true
        createdBy nullable: true
        modifiedBy nullable: true
    }

    static mapping = {
        table 'leave_requests'
        reason type: 'text'
        remarks type: 'text'
    }

    String toString() { "${employee?.fullName} - ${leaveType} (${status})" }
}