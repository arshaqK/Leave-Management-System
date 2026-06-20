package com.leavemanagement

class AuditLog {

    String entityName
    Long entityId
    String action        // CREATE, UPDATE, DELETE
    String performedBy
    String details
    Date dateCreated

    static constraints = {
        entityName blank: false, maxSize: 100
        entityId nullable: true
        action blank: false, inList: ['CREATE', 'UPDATE', 'DELETE']
        performedBy blank: false, maxSize: 100
        details nullable: true, maxSize: 1000
    }

    static mapping = {
        table 'audit_logs'
        details type: 'text'
        autoTimestamp false
    }

    String toString() { "${action} on ${entityName} by ${performedBy}" }
}